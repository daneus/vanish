function toggleElements() {
  const endScreenElements = document.querySelectorAll('.ytp-ce-element');

  endScreenElements.forEach((element) => {
    element.style.display = 'none';
  });
}

toggleElements();
