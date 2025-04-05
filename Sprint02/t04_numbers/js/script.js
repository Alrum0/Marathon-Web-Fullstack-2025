function checkDivision(beginRange = 1, endRange = 100) {
    for (let i = beginRange; i <= endRange; i++) {
        let answer = i;
        let info = false;

        if (i % 2 === 0) {
            answer += ' is even,';
            info = true;
        } 
        if (i % 3 === 0) {
            answer += ' is a multiple of 3,';
            info = true;
        }
        if (i % 10 === 0) {
            answer += ' is a multiple of 10,';
            info = true;
        }

        if (info) {
            console.log(answer.slice(0, -1));    
        } else {
            console.log(i + " -");
        }
    }
}

let beginRange = parseInt(prompt('Enter the beginning of the range:'));
let endRange = parseInt(prompt('Enter the end of the range:'));

checkDivision(beginRange, endRange);