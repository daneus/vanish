function executeToggle() {
  const endScreenElements = document.querySelectorAll('.ytp-ce-element');

  endScreenElements.forEach(async (element) => {
    const { vanish } = await chrome.storage.local.get(['vanish']);
    if (vanish) {
      element.style.opacity = '0';
    } else {
      element.style.opacity = '1';
    }
  });
}

executeToggle();
