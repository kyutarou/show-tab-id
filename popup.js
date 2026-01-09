document.addEventListener('DOMContentLoaded', async () => {
  const tabIdEl = document.getElementById('tabId');
  const tabTitleEl = document.getElementById('tabTitle');
  const copyBtn = document.getElementById('copyBtn');
  const errorEl = document.getElementById('error');

  try {
    // 現在のアクティブタブを取得
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
      tabIdEl.textContent = tab.id;
      tabTitleEl.textContent = tab.title || '(タイトルなし)';

      // コピーボタンのクリックイベント
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(String(tab.id));
          copyBtn.textContent = 'コピーしました!';
          copyBtn.classList.add('copied');

          setTimeout(() => {
            copyBtn.textContent = 'IDをコピー';
            copyBtn.classList.remove('copied');
          }, 1500);
        } catch (err) {
          errorEl.textContent = 'コピーに失敗しました';
        }
      });
    } else {
      tabIdEl.textContent = '-';
      errorEl.textContent = 'タブ情報を取得できませんでした';
    }
  } catch (err) {
    errorEl.textContent = `エラー: ${err.message}`;
  }
});
