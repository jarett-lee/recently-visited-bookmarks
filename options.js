// Saves options to chrome.storage
function saveOptions() {
    // TODO
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    // TODO
}

// Displays all the bookmarks the user currently has with a checkbox
// to select the folders they want sorted.
function displayBookmarks() {
    var display = document.getElementById('display');

    chrome.bookmarks.getTree(function(result_arr) {
        var root_node = result_arr[0];

        // Start bookmarks list
        var root_ul = document.createElement('UL');
        display.appendChild(root_ul);

        populateList(root_node, root_ul);

    });
}

function populateList(node, list) {
    var node_title = document.createTextNode(node.title);
    var list_item = document.createElement('LI');
    list_item.appendChild(node_title);
    list.appendChild(list_item);

    if (node.children) {
        // The node is a branch

        // Start a new list
        var child_list = document.createElement('UL');
        list.appendChild(child_list);

        node.children.forEach(function(chile_node) {
            populateList(chile_node, child_list);
        });
    }
}

document.addEventListener('DOMContentLoaded', displayBookmarks);
document.getElementById('save').addEventListener('click', saveOptions);
