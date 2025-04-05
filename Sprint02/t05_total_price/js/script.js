function total(addCount, addPrice, currentTotal) {
    if (currentTotal == undefined || Number.isNaN(currentTotal)) {
        currentTotal = 0;
    } 
    return currentTotal + (addCount * addPrice);
}
