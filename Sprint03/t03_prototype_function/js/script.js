String.prototype.removeDuplicates = function () {
    return [...new Set(this.trim().split(/\s+/))].join(' ');
}
