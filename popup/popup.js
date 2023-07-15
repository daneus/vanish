const circleContainer = document.querySelector('.circle-container');

const circle = document.querySelector('.circle');

const checkbox = document.getElementById('vanish_toggle');

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
  }
}

setCheckbox();

document.addEventListener('DOMContentLoaded', () => {
  checkbox.addEventListener('change', async () => {
    circleContainer.classList.toggle('activated');
    circle.classList.toggle('activated');

    const { vanish } = await chrome.storage.local.get(['vanish']);
    chrome.storage.local.set({ vanish: !vanish });
    if (!vanish) {
      chrome.action.setBadgeText({ text: 'ON' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }

    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        console.log('Tab:' + JSON.stringify(tab));
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['/scripts/vanish-script.js'],
        });
      });
    });
  });
});
