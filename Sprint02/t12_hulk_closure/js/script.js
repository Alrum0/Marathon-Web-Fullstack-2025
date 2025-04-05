function concat(string1, string2) {
    let count = 0;
    if (string2 !== undefined) {
        return string1 + ' ' + string2;
    } else {
        function innerFunc() {
            innerFunc.count++;
            let secondString = prompt('Enter second string');
            return string1 + ' ' + secondString;
        }
        innerFunc.count = count;
        return innerFunc;
    }
}

