exports.checkDivision = function (beginRange = 1, endRange = 60) {
    for (let i = beginRange; i <= endRange; i++) {

        let answer = `The number ${i}`;

        let info = false;

        if (i % 2 === 0) {
            answer += ' is divisible by 2,';
            info = true;
        }
        if (i % 3 === 0) {
            answer += ' is divisible by 3,';
            info = true;
        }
        if (i % 10 === 0) {
            answer += ' is divisible by 10,';
            info = true;
        }

        if (info) {
            console.log(answer.slice(0, -1));
        } else {
            console.log(`The number ${i}` + ' -');
        }
    }
}