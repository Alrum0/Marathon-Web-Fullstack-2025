function sortEvenOdd(arr) {
    arr.sort((a, b) => {
        const aIsEven = a % 2 === 0;
        const bIsEven = b % 2 === 0;
        
        if (aIsEven && !bIsEven) return -1;
        if (!aIsEven && bIsEven) return 1;
        
        return a - b;
    });
}
