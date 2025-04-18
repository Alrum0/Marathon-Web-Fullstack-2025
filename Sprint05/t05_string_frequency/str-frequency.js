class StrFrequency {
    constructor(str) {
        this.str = str;
    }

    letterFrequencies() {
        const cleanedStr = this.str.replace(/[^a-zA-z]/g, '').toUpperCase();
        return cleanedStr.split('').reduce((prev, curr) => {
            prev[curr] = prev[curr] ? prev[curr] + 1 : 1;
            return prev;
        }, {});
    }

    wordFrequencies() {
        if (this.str === '') return { '': 1 };

        let words = this.str
            .replace(/[^a-zA-Z]/g, ' ')
            .toUpperCase()
            .trim()
            .split(/\s+/);

        const freqMap = {};
        words.forEach(w => {
            if (!w) return;
            freqMap[w] = (freqMap[w] || 0) + 1;
        });
        return freqMap;
    }

    reverseString() {
        return this.str.split('').reverse().join('');
    }

}

module.exports = StrFrequency;