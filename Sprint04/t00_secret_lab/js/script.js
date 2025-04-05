function transformation() {
    let heroName = document.getElementById('hero');
    let background = document.getElementById('lab');

    if (heroName.innerText === 'Bruce Banner') {
        heroName.innerText = 'Hulk';
        heroName.style.fontSize = '130px';
        heroName.style.letterSpacing = '6px';
        background.style.background = '#70964b'
    } else {
        heroName.innerText = 'Bruce Banner';
        heroName.style.fontSize = '60px';
        heroName.style.letterSpacing = '2px'
        background.style.background = '#ffb300'
    }
}