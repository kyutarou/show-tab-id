document.addEventListener('DOMContentLoaded', async () => {
  const tabIdValueEl = document.getElementById('tabIdValue');
  const tabIdOnlyValueEl = document.getElementById('tabIdOnlyValue');
  const tabIdFullEl = document.getElementById('tabIdFull');
  const tabIdOnlyEl = document.getElementById('tabIdOnly');
  const errorEl = document.getElementById('error');

  // Helper function for copy feedback with icon change
  const showCopyFeedback = (cardElement) => {
    cardElement.classList.add('copied');

    setTimeout(() => {
      cardElement.classList.remove('copied');
    }, 1500);
  };

  try {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
      const tabId = String(tab.id);
      tabIdValueEl.textContent = tabId;
      tabIdOnlyValueEl.textContent = tabId;

      // Click handler for "tabid is ******" - copies full format
      tabIdFullEl.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(`tabid is ${tabId}`);
          showCopyFeedback(tabIdFullEl);
        } catch (err) {
          errorEl.textContent = 'Failed to copy';
        }
      });

      // Click handler for ID only - copies just the number
      tabIdOnlyEl.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(tabId);
          showCopyFeedback(tabIdOnlyEl);
        } catch (err) {
          errorEl.textContent = 'Failed to copy';
        }
      });
    } else {
      tabIdValueEl.textContent = '-';
      tabIdOnlyValueEl.textContent = '-';
      errorEl.textContent = 'Could not get tab info';
    }
  } catch (err) {
    errorEl.textContent = `Error: ${err.message}`;
  }
});
