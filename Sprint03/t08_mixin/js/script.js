const houseMixin = {
    wordReplace(oldWord, newWord) {
        this.description = this.description.replace(oldWord, newWord);
    },
    wordInsertAfter(targetWord, newWord) {
        this.description = this.description.replace(new RegExp(targetWord, 'g'), targetWord + ' ' + newWord);
    },
    wordDelete(word) {
        this.description = this.description.replace(new RegExp(word, 'g'), '');
    },
    wordEncrypt() {
        this.description = this.description.replace(/[a-zA-Z]/g, function (char) {
            let code = char.charCodeAt(0);
            let shift = code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - shift + 13) % 26) + shift);
        });
    },
    wordDecrypt() {
        this.wordEncrypt();
    }
};
