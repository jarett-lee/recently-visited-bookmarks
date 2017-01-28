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
    chrome.bookmarks.search(url, function(array) {
        chrome.storage.sync.get('settings', function(items) {
            if (items.settings) {
                var settings = items.settings;
                array.forEach(function(bookmark) {
                    if (bookmark.url == url) {
                        tryToUpdate(bookmark, settings);
                    }
                });
            }
        });
    });
}

function tryToUpdate(bookmark, settings) {
    console.log(settings);
    console.log(bookmark.parentId);
    searchForParent(bookmark.parentId, settings, function() {
        var moveParams = {};
        moveParams.parentId = bookmark.parentId;
        moveParams.index = 0;
        chrome.bookmarks.move(bookmark.id, moveParams);
    });
}

function searchForParent(id, settings, callback) {
    if (binarySearch(id, settings) != -1) {
        callback();
    }
}
