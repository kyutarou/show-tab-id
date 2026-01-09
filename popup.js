document.addEventListener('DOMContentLoaded', async () => {
  const tabIdEl = document.getElementById('tabId');
  const tabTitleEl = document.getElementById('tabTitle');
  const copyBtn = document.getElementById('copyBtn');
  const errorEl = document.getElementById('error');

  try {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
      tabIdEl.textContent = tab.id;
      tabTitleEl.textContent = tab.title || '(No title)';

      // Copy button click handler
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(String(tab.id));
          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('copied');

          setTimeout(() => {
            copyBtn.textContent = 'Copy ID';
            copyBtn.classList.remove('copied');
          }, 1500);
        } catch (err) {
          errorEl.textContent = 'Failed to copy';
        }
      });
    } else {
      tabIdEl.textContent = '-';
      errorEl.textContent = 'Could not get tab info';
    }
  } catch (err) {
    errorEl.textContent = `Error: ${err.message}`;
  }
});
