function executeToggle() {
  const endScreenElements = document.querySelectorAll('.ytp-ce-element');

  endScreenElements.forEach(async (element) => {
    const { vanish } = await chrome.storage.local.get(['vanish']);
    if (vanish) {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  });
}

executeToggle();
