function Calculator() {
    let result = 0;

    return {
        init(num) {
            result = num;
            return this;
        },
        add(num) {
            result += num;
            return this;
        },
        mul(num) {
            result *= num;
            return this;
        },
        div(num) {
            if (num === 0) {
                return 'Error: Division by zero';
            }
            result /= num;
            return this;
        },
        alert() {
            setTimeout(() => alert('Current result: ' + result), 5000);
            return this;
        },
        get result() {
            return result;
        }
    };
}


let culc = new Calculator();

console.log(culc.init(2).add(2).mul(10).div(2).result);