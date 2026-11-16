const shareButton = document.getElementById('share-library');
const notice = document.getElementById('notice');
const dialog = document.getElementById('link-dialog');
const urlField = document.getElementById('share-url');
const libraryUrl = new URL('./', window.location.href).href;
let noticeTimer;

async function shareLibrary() {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Moonshine & Merchants Yard · Media library', url: libraryUrl });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(libraryUrl);
    notice.textContent = 'Library link copied';
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { notice.textContent = ''; }, 2600);
  } catch {
    urlField.value = libraryUrl;
    dialog.showModal();
    urlField.focus();
    urlField.select();
  }
}

shareButton.hidden = false;
shareButton.addEventListener('click', shareLibrary);
