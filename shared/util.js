
function binarySearch(id, settings) {
    var min = 0;
    var max = settings.length - 1;
    var mid = Math.floor(max / 2);
    while (min <= max) {
        var cmp = simplecmp(id, settings[mid]);
        if (cmp == 0) {
            return mid;
        }
        else if (cmp < 0) {
            max = mid - 1;
        }
        else {
            min = mid + 1;
        }
        mid = Math.floor((min + max) / 2);
    }
    return -1;
}

function simplecmp(a, b) {
    return a == b ? 0 : a < b ? -1 : 1;
}
