async function getTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}

document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('vanish_toggle');
  checkbox.addEventListener('change', async () => {
    chrome.scripting.executeScript({
      target: { tabId: await getTabId() },
      files: ['/scripts/vanish-script.js'],
    });
  });
});
