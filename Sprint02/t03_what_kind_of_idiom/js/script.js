let inputText

do {
    inputText = prompt('Enter a number from 1 to 10:');
    inputText = Number(inputText);
} while(isNaN(inputText) || inputText < 1 || inputText > 10)

let result;
switch(inputText) {
    case 1:
        result = 'Back to square 1';
        break;
    case 2:
        result = 'Goody 2-shoes';
        break;
    case 3:
    case 6:
        result = "Two's company, three's a crowd";
        break;
    case 4:
    case 9:
        result = 'Counting sheep';
        break;
    case 5:
        result = 'Take five';
        break;
    case 7:
        result = 'Seventh heaven';
        break;
    case 8:
        result = 'Behind the eight-ball';
        break;
    case 10:
        result = 'Cheaper by the dozen';
        break;
}

alert(result);
