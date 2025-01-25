const background = require('../background.js');

describe('Storage Clearing Functions', () => {
  let mockTab;
  let mockRuntimeError;
  
  beforeEach(() => {
    mockTab = {
      id: 1,
      url: 'https://example.com/path'
    };
    
    mockRuntimeError = null;
    
    // Reset storage states
    global.localStorage = {
      length: 2,
      clear: jest.fn(),
    };
    
    global.sessionStorage = {
      length: 3,
      clear: jest.fn(),
    };
    
    // Reset chrome API mocks
    chrome.cookies.getAll.mockClear();
    chrome.cookies.remove.mockClear();
    chrome.scripting.executeScript.mockClear();
    chrome.contextMenus.create.mockClear();
    chrome.runtime.lastError = null;
  });

  describe('clearLocalStorage', () => {
    it('should clear localStorage', () => {
      background.clearLocalStorage(mockTab);
      expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
        target: { tabId: mockTab.id },
        function: expect.any(Function)
      }, expect.any(Function));
    });

    it('should handle script execution errors', () => {
      // Mock runtime error
      chrome.runtime.lastError = { message: 'Script execution failed' };
      
      // Call the callback with the error
      chrome.scripting.executeScript.mockImplementation((params, callback) => {
        callback();
      });
      
      background.clearLocalStorage(mockTab);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to execute script:',
        { message: 'Script execution failed' }
      );
    });
  });

  describe('clearSessionStorage', () => {
    it('should clear sessionStorage', () => {
      background.clearSessionStorage(mockTab);
      expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
        target: { tabId: mockTab.id },
        function: expect.any(Function)
      }, expect.any(Function));
    });

    it('should handle script execution errors', () => {
      // Mock runtime error
      chrome.runtime.lastError = { message: 'Script execution failed' };
      
      // Call the callback with the error
      chrome.scripting.executeScript.mockImplementation((params, callback) => {
        callback();
      });
      
      background.clearSessionStorage(mockTab);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to execute script:',
        { message: 'Script execution failed' }
      );
    });
  });

  describe('clearCookies', () => {
    it('should clear all cookies for domain', () => {
      const mockCookies = [
        { name: 'cookie1', domain: 'example.com', path: '/', secure: false },
        { name: 'cookie2', domain: '.example.com', path: '/path', secure: true }
      ];
      
      chrome.cookies.getAll.mockImplementation((params, callback) => {
        callback(mockCookies);
      });
      
      background.clearCookies(mockTab);
      
      expect(chrome.cookies.getAll).toHaveBeenCalledWith(
        { domain: 'example.com' },
        expect.any(Function)
      );
    });

    it('should handle secure and non-secure cookies', () => {
      const mockCookies = [
        { name: 'cookie1', domain: 'example.com', path: '/', secure: true },
      ];
      
      chrome.cookies.getAll.mockImplementation((params, callback) => {
        callback(mockCookies);
      });
      
      background.clearCookies(mockTab);
      
      expect(chrome.cookies.remove).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://example.com/',
          name: 'cookie1'
        }),
        expect.any(Function)
      );
    });

    it('should handle no cookies', () => {
      chrome.cookies.getAll.mockImplementation((params, callback) => {
        callback([]);
      });
      
      background.clearCookies(mockTab);
      expect(chrome.cookies.remove).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('No cookies found to clear');
    });

    it('should handle cookie removal errors', () => {
      const mockCookies = [{ name: 'cookie1', domain: 'example.com', path: '/' }];
      chrome.cookies.getAll.mockImplementation((params, callback) => {
        callback(mockCookies);
      });
      chrome.cookies.remove.mockImplementation((params, callback) => {
        callback(null);
        chrome.runtime.lastError = { message: 'Failed to remove cookie' };
      });
      
      background.clearCookies(mockTab);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('clearCache', () => {
    it('should clear browser cache', () => {
      background.clearCache(mockTab);
      expect(chrome.browsingData.removeCache).toHaveBeenCalledWith(
        { since: 0 },
        expect.any(Function)
      );
    });

    it('should log success message', () => {
      background.clearCache(mockTab);
      expect(console.log).toHaveBeenCalledWith('Cache cleared');
    });
  });

  describe('clearAll', () => {
    it('should call all clearing functions', () => {
      background.clearAll(mockTab);
      expect(chrome.scripting.executeScript).toHaveBeenCalledTimes(2); // localStorage and sessionStorage
      expect(chrome.cookies.getAll).toHaveBeenCalled();
      expect(chrome.browsingData.removeCache).toHaveBeenCalled();
    });
  });

  describe('Context Menu Integration', () => {
    let installedCallback;
    let clickedCallback;

    beforeEach(() => {
      // Store the callbacks when they're registered
      chrome.runtime.onInstalled.addListener.mockImplementation((callback) => {
        installedCallback = callback;
      });
      
      chrome.contextMenus.onClicked.addListener.mockImplementation((callback) => {
        clickedCallback = callback;
      });
      
      // Load the background script to register the listeners
      jest.isolateModules(() => {
        require('../background.js');
      });
    });

    it('should create all context menu items on install', () => {
      // Trigger the installed callback
      installedCallback();
      
      expect(chrome.contextMenus.create).toHaveBeenCalledTimes(5);
      expect(chrome.contextMenus.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'clearAll',
          title: 'Clear All Storage',
          contexts: ['action']
        })
      );
    });

    it('should handle context menu clicks correctly', () => {
      // Trigger click events
      clickedCallback({ menuItemId: 'clearAll' }, mockTab);
      expect(chrome.scripting.executeScript).toHaveBeenCalled();
      
      chrome.scripting.executeScript.mockClear();
      
      clickedCallback({ menuItemId: 'clearLocal' }, mockTab);
      expect(chrome.scripting.executeScript).toHaveBeenCalled();
    });
  });
}); 