const circleContainer = document.querySelector('.circle-container');
const circle = document.querySelector('.circle');
const checkbox = document.getElementById('vanish_toggle');
const title = document.querySelector('.title');
const body = document.querySelector('body');

async function getTabId() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}

async function setCheckbox() {
  const { vanish } = await chrome.storage.local.get(['vanish']);
  if (vanish) {
    checkbox.checked = vanish;
    circleContainer.classList.add('activated');
    circle.classList.add('activated');
    title.classList.add('activated');
    body.classList.add('activated');
  }
}

setCheckbox();

document.addEventListener('DOMContentLoaded', () => {
  checkbox.addEventListener('change', async () => {
    circleContainer.classList.toggle('activated');
    circle.classList.toggle('activated');
    title.classList.toggle('activated');
    body.classList.toggle('activated');

    const { vanish } = await chrome.storage.local.get(['vanish']);
    chrome.storage.local.set({ vanish: !vanish });
    if (!vanish) {
      chrome.action.setBadgeText({ text: 'ON' });
      chrome.action.setBadgeBackgroundColor({ color: '#007bde' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }

    chrome.tabs.query({}, function (tabs) {
      const youtubeTabs = tabs.filter((tab) =>
        /^https:\/\/.*\.youtube\.com\/.*/.test(tab.url)
      );
      youtubeTabs.forEach(function (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['/scripts/vanish-script.js'],
        });
      });
    });
  });
});
