
chrome.tabs.onUpdated.addListener(tabListener);

function tabListener(tabId, changeInfo, tab) {
  var url = changeInfo.url;
  if (url != undefined) {
    lookForUrlInBookmarks(url);
  }
}

/**
 * Takes an url and looks for bookmarks with the same url
 * and saves the last time the url was last visited.
 */
function lookForUrlInBookmarks(url) {
  chrome.bookmarks.search(url, function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].url == url) {
        updateLastVisitedOrder(array[i]);
        return;
      }
    }
  })
}

function updateLastVisitedOrder(bookmark) {
  if (bookmark.parentId == '9') {
    var parent = {};
    parent.parentId = bookmark.parentId;
    parent.index = 0;
    chrome.bookmarks.move(bookmark.id, parent);
  }
}
