let number = 10;
let bigInt = 1n;
let string = 'Hello';
let boolean = true;
let _null = null;
let _undefined;
let object = {};
let symbol = Symbol();
let _function = function () {};

alert(
    `Number is ${typeof number}\n` +
    `BigInt is ${typeof bigInt}\n` +
    `String is ${typeof string}\n` +
    `Boolean is ${typeof boolean}\n` +
    `Null is ${typeof _null}\n` +
    `Undefined is ${typeof _undefined}\n` +
    `Object is ${typeof object}\n` +
    `Symbol is ${typeof symbol}\n` +
    `Function is ${typeof _function}`
);
