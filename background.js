chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ vanish: false });
});

chrome.tabs.onCreated.addListener(() => {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['/scripts/vanish-script.js'],
      });
    });
  });
});
