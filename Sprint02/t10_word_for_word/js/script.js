function addWords(obj, wrds) {
    let newWords = new Set(obj.words.split(' ').filter(Boolean));
    wrds.split(' ').filter(Boolean).forEach(word => newWords.add(word));
    obj.words = Array.from(newWords).join(' ');
}

function removeWords(obj, wrds) {
    let wordsSet = new Set(obj.words.split(' ').filter(Boolean));
    wrds.split(' ').filter(Boolean).forEach(word => wordsSet.delete(word));
    obj.words = Array.from(wordsSet).join(' ');
}

function changeWords(obj, oldWrds, newWrds) {
    removeWords(obj, oldWrds);
    addWords(obj, newWrds);
}
