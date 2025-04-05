function* stepGenerator() {
    let step = 1;
    while (true) {
        const input = prompt(`Previous result: ${step}. Enter a number:`);
        if (input === null) {
            console.log('Generator stopped.');
            break;
        }
        const number = Number(input);
        if (isNaN(number)) {
            console.error('Invalid number!');
            continue;
        }
        step += number;
        if (step > 10000) {
            step = 1;
        }
        yield step;
    }
}

const generator = stepGenerator();
for (const value of generator) {
	console.log(`Generated value: ${value}`);
}
