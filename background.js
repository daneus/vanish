chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ vanish: false });
});
