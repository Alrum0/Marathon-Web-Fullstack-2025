function checkBrackets(str) {
    if (typeof str !== 'string' || !/[()]/.test(str)) {
        return -1;
    }

    let openBrackets = 0;
    let closeBrackets = 0;

    for (let char of str) {
        if (char === '(') {
            openBrackets++;
        } else if (char === ')') {
            if (openBrackets > 0) {
                openBrackets--;
            } else {
                closeBrackets++;
            }
        }
    }

    return openBrackets + closeBrackets;
}
