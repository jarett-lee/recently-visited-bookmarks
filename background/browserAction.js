chrome.browserAction.onClicked.addListener(openSettingsPage);

function openSettingsPage(tab) {
    chrome.runtime.openOptionsPage(function() {});
}
