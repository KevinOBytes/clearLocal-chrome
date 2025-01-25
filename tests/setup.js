const { afterEach } = require('@jest/globals');

// Mock Chrome API
global.chrome = {
  runtime: {
    lastError: null,
    onInstalled: {
      addListener: jest.fn()
    }
  },
  action: {
    onClicked: {
      addListener: jest.fn()
    }
  },
  contextMenus: {
    create: jest.fn(),
    onClicked: {
      addListener: jest.fn()
    }
  },
  cookies: {
    getAll: jest.fn(),
    remove: jest.fn()
  },
  scripting: {
    executeScript: jest.fn().mockImplementation((params, callback) => {
      if (callback) {
        if (chrome.runtime.lastError) {
          callback();
        } else {
          callback([{ result: { success: true } }]);
        }
      }
    })
  },
  browsingData: {
    removeCache: jest.fn().mockImplementation((params, callback) => {
      if (callback) callback();
    })
  }
};

// Mock console methods
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
  chrome.runtime.lastError = null;
}); 