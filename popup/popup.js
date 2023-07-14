const checkbox = document.getElementById('vanish_toggle');

const getTabId = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
};

(async () => {
  const { vanish } = await chrome.storage.local.get(['vanish']);
  if (vanish) {
    checkbox.checked = vanish;
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  checkbox.addEventListener('change', async () => {
    const { vanish } = await chrome.storage.local.get(['vanish']);
    chrome.storage.local.set({ vanish: !vanish });
    if (!vanish) {
      chrome.action.setBadgeText({ text: 'ON' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
    chrome.scripting.executeScript({
      target: { tabId: await getTabId() },
      files: ['/scripts/vanish-script.js'],
    });
  });
});
