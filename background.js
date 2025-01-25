// Create context menu items when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'clearAll',
    title: 'Clear All Storage',
    contexts: ['action']
  });
  
  chrome.contextMenus.create({
    id: 'clearLocal',
    title: 'Clear Local Storage',
    contexts: ['action']
  });
  
  chrome.contextMenus.create({
    id: 'clearSession',
    title: 'Clear Session Storage',
    contexts: ['action']
  });
  
  chrome.contextMenus.create({
    id: 'clearCookies',
    title: 'Clear Cookies',
    contexts: ['action']
  });
  
  chrome.contextMenus.create({
    id: 'clearCache',
    title: 'Clear Cache',
    contexts: ['action']
  });
});

// Handle toolbar button click (clear all by default)
chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension clicked for tab:', tab.url);
  try {
    await clearAll(tab);
    console.log('Successfully cleared all storage');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('Context menu clicked:', info.menuItemId);
  try {
    switch (info.menuItemId) {
      case 'clearAll':
        await clearAll(tab);
        break;
      case 'clearLocal':
        await clearLocalStorage(tab);
        break;
      case 'clearSession':
        await clearSessionStorage(tab);
        break;
      case 'clearCookies':
        await clearCookies(tab);
        break;
      case 'clearCache':
        await clearCache(tab);
        break;
    }
  } catch (error) {
    console.error('Error handling context menu click:', error);
  }
});

async function clearAll(tab) {
  await Promise.all([
    clearLocalStorage(tab),
    clearSessionStorage(tab),
    clearCookies(tab),
    clearCache(tab)
  ]);
}

async function clearLocalStorage(tab) {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        try {
          const itemCount = localStorage.length;
          localStorage.clear();
          console.log(`Local storage cleared (${itemCount} items)`);
          return { success: true, itemCount };
        } catch (error) {
          console.error('Failed to clear localStorage:', error);
          return { success: false, error: error.message };
        }
      }
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to execute script:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve(results);
      }
    });
  });
}

async function clearSessionStorage(tab) {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        try {
          const itemCount = sessionStorage.length;
          sessionStorage.clear();
          console.log(`Session storage cleared (${itemCount} items)`);
          return { success: true, itemCount };
        } catch (error) {
          console.error('Failed to clear sessionStorage:', error);
          return { success: false, error: error.message };
        }
      }
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to execute script:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve(results);
      }
    });
  });
}

async function clearCookies(tab) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(tab.url);
      chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
        const cleared = { total: cookies.length, success: 0, failed: 0 };
        
        if (cookies.length === 0) {
          console.log('No cookies found to clear');
          resolve(cleared);
          return;
        }

        let completedOperations = 0;
        
        cookies.forEach((cookie) => {
          const protocols = cookie.secure ? ['https:'] : ['http:', 'https:'];
          const domains = [
            cookie.domain,
            cookie.domain.startsWith('.') ? cookie.domain.slice(1) : `.${cookie.domain}`
          ];

          protocols.forEach(protocol => {
            domains.forEach(domain => {
              const cookieUrl = `${protocol}//${domain}${cookie.path}`;
              
              chrome.cookies.remove({
                url: cookieUrl,
                name: cookie.name,
                storeId: cookie.storeId
              }, (details) => {
                completedOperations++;
                
                if (chrome.runtime.lastError) {
                  console.error(`Failed to clear cookie: ${cookie.name}`, chrome.runtime.lastError);
                  cleared.failed++;
                } else {
                  cleared.success++;
                }
                
                if (completedOperations === cookies.length * protocols.length * domains.length) {
                  console.log(`Cookies cleared: ${cleared.success}/${cleared.total}`);
                  if (cleared.failed > 0) {
                    console.warn(`Failed to clear ${cleared.failed} cookies`);
                  }
                  resolve(cleared);
                }
              });
            });
          });
        });
      });
    } catch (error) {
      console.error('Error in clearCookies:', error);
      reject(error);
    }
  });
}

async function clearCache(tab) {
  return new Promise((resolve, reject) => {
    chrome.browsingData.removeCache({
      since: 0
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Failed to clear cache:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log('Cache cleared');
        resolve();
      }
    });
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    clearLocalStorage,
    clearSessionStorage,
    clearCookies,
    clearCache,
    clearAll
  };
} 