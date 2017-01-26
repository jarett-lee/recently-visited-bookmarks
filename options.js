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
        root_ul.classList.add('list');
        display.appendChild(root_ul);

        populateBookmarkList(root_node, root_ul, 0);

    });
}

// Recursively adds bookmark node titles to an expandable list
function populateBookmarkList(node, list, num) {
    var node_title = document.createTextNode(node.title + ' ' + num);
    var list_item = document.createElement('LI');
    list_item.classList.add('list-item');
    list.appendChild(list_item);
    var checkbox = document.createElement('INPUT');
    checkbox.type = 'checkbox';

    if (node.children) {
        // The node is a branch

        // Start a new list
        var child_list = document.createElement('UL');
        child_list.classList.add('hide');
        child_list.classList.add('list');
        list.appendChild(child_list);

        // Add expand on click
        var show_more = document.createElement('BUTTON');
        show_more.textContent = '+';
        show_more.classList.add('plus');
        show_more.onmousedown = createExpander(child_list);
        list_item.appendChild(show_more)

        node.children.forEach(function(child_node, list_num) {
            populateBookmarkList(child_node, child_list, list_num);
        });
    }

    list_item.appendChild(checkbox);
    list_item.appendChild(node_title);
}

function createExpander(child_list) {
    return function() {
        expandChildren(child_list);
        togglePlus(this);
    }
}

function togglePlus(button) {
    if (button.textContent == '+') {
        button.textContent = '-';
    }
    else {
        button.textContent = '+';
    }
}

function expandChildren(child_list) {
    child_list.classList.toggle('hide');
}

document.addEventListener('DOMContentLoaded', displayBookmarks);
document.getElementById('save').addEventListener('click', saveOptions);
