const validator = { 
    get: function (target, properties) {
        console.log(`Trying to access the property '${properties}'...`);
        return properties in target ? target[properties] : false;
    },
    set: function (target, properties, value) {
        console.log(`Setting value '${value}' to '${properties}'...`);
        if (properties === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value < 0 || value > 200) {
                throw new RangeError('The age is invalid');
            }
        }

        target[properties] = value;
        return true;
    } 
}
