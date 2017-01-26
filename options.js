
// Saves options to chrome.storage
function saveOptions() {
  // TODO
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  displayBookmarks(function() {
  })
}

// Displays all the bookmarks the user currently has with a checkbox
// to select the folders they want sorted.
function displayBookmarks(callback) {
  var display = document.getElementById('display');

  // Working solution
  chrome.bookmarks.getTree(function(results) {
    var all_bookmarks = results[0].children;

    // Start bookmarks list
    var base_ul = document.createElement('UL');
    display.appendChild(base_ul);

    all_bookmarks.forEach(function(element) {
      var bookmark_title = document.createTextNode(element.title);
      var li = document.createElement('LI');
      li.appendChild(bookmark_title);
      base_ul.appendChild(li);

      // Start sub list
      var upper_ul = document.createElement('UL');
      base_ul.appendChild(upper_ul);

      element.children.forEach(function(element) {
        var bookmark_title = document.createTextNode(element.title);
        var li = document.createElement('LI');
        li.appendChild(bookmark_title);
        upper_ul.appendChild(li);

      })

    })
    for (var i = 0; i < all_bookmarks.length; i++) {
      all_bookmarks[i].children;
    }
  });

  callback();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
