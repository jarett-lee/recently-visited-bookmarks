var sort_bookmarks;

// Saves options to chrome.storage
function saveOptions() {
    sort_bookmarks.sort(function(a, b) {
        return a > b;
    });
    chrome.storage.sync.set({'settings': sort_bookmarks}, function() {
        statusMessage('settings saved');
    });
}

function statusMessage(text) {
    var status = document.getElementById('status');
    status.textContent = text;
    var clear_timer = setTimeout(function() {
        status.textContent = '';
    }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get('settings', function(items) {
        if (items.settings) {
            sort_bookmarks = items.settings;
        }
        else {
            sort_bookmarks = [];
        }
        var save = document.getElementById('save');
        save.disabled = false;
        displayBookmarks();
    });
}

// Displays all the bookmarks the user currently has with a checkbox
// to select the folders they want sorted.
function displayBookmarks() {
    var display = document.getElementById('display');

    chrome.bookmarks.getTree(function(result_arr) {
        var root_node = result_arr[0];

        // Start bookmarks list
        var root_ul = document.createElement('DIV');
        root_ul.classList.add('list');
        display.appendChild(root_ul);

        populateBookmarkList(root_node, root_ul, 0, 0);

    });
}

function createListSpacerElement() {
    var spacer = document.createElement('DIV');
    spacer.classList.add('spacer');
    spacer.style.order = 0;
    return spacer;
}

function createItemTextElement(text) {
    var item_text = document.createElement('DIV');
    item_text.classList.add('text');
    item_text.textContent = text;
    return item_text;
}

function createListItemElement(n_spacers, text) {
    // <div class="list-item">
    var list_item = document.createElement('DIV');
    list_item.classList.add('list-item');

    // <div class="spacer">
    var spacer;
    for (var i = 0; i < n_spacers; i++) {
        spacer = createListSpacerElement();
        list_item.appendChild(spacer);
    }

    var item_text = createItemTextElement(text);
    item_text.style.order = n_spacers + 3;
    list_item.appendChild(item_text);

    return list_item;
}

function createShowMoreFunction(list) {
    var show_more = document.createElement('DIV');
    show_more.classList.add('plus');
    show_more.textContent = '+';
    show_more.onmousedown = createExpander(list);
    return show_more;
}

// Recursively adds bookmark node titles to an expandable list
function populateBookmarkList(node, list, num, depth) {
    // Create list item
    var list_item = createListItemElement(depth, node.title + ' ' + num);
    list.appendChild(list_item);

    // Add checkbox
    var checkbox = document.createElement('INPUT');
    checkbox.type = 'checkbox';
    checkbox.onclick = createAddToSort(node);
    checkbox.style.order = depth + 2;
    list_item.appendChild(checkbox);

    if (node.children) {
        // The node is a branch

        // Start a new list
        var child_list = document.createElement('DIV');
        child_list.classList.add('list');
        child_list.classList.add('hide');
        list.appendChild(child_list);

        // Add expand on click
        var show_more = createShowMoreFunction(child_list);
        show_more.style.order = depth + 1;
        list_item.appendChild(show_more);

        // Check the box if the program is in the settings
        // List should be just loaded from chrome sync and there sorted
        if (binarySearch(node.id, sort_bookmarks) != -1) {
            checkbox.checked = true;
        }

        node.children.forEach(function(child_node, list_num) {
            populateBookmarkList(child_node, child_list, list_num, depth + 1);
        });
    }
    else {
        spacer = createListSpacerElement();
        list_item.appendChild(spacer);
    }
}

function createAddToSort(bookmark) {
    return function() {
        var numId = parseInt(bookmark.id);
        if (this.checked) {
            sort_bookmarks.push(numId);
        }
        else {
            var index = sort_bookmarks.indexOf(numId);
            if (index > -1) {
                sort_bookmarks.splice(index, 1);
            }
        }
    }
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

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
