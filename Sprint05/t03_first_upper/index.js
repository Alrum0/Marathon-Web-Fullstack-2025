exports.firstUpper = function (string) {
    if (string === null) return '';

    string = string.trim();
    return string.length === 0
        ? ''
        : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
