console.log(checkBrackets('1)()(())2(()')); 
console.log(checkBrackets(NaN)); 
console.log(checkBrackets(123)); 
console.log(checkBrackets(undefined));
console.log(checkBrackets(true)); 
console.log(checkBrackets(false)); 
console.log(checkBrackets({})); 
console.log(checkBrackets([])); 
console.log(checkBrackets('')); 
console.log(checkBrackets('()')); 
console.log(checkBrackets('(()'));
console.log(checkBrackets('())'));
console.log(checkBrackets('(a + b) * (c + d)')); 
console.log(checkBrackets(')(')); 
console.log(checkBrackets('())(')); 
console.log(checkBrackets('((())))')); 
console.log(checkBrackets('())')); 
console.log(checkBrackets('(()')); 
console.log(checkBrackets('(()(()')); 
console.log(checkBrackets('())(')); 