function copyObj(obj) {
    let copy = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = obj[key];
        }
    }
    return copy;
}
