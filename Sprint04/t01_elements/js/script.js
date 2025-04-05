let characters = document.querySelectorAll('#characters li');

characters.forEach(character => {
    let validClasses = ['good', 'evil', 'unknown'];

    if (!character.classList.length || !validClasses.includes(character.className)) {
        character.className = 'unknown';
    }

    if (!character.hasAttribute('data-element')) {
        character.setAttribute('data-element', 'none');
    }

    let wrapper = document.createElement('div');

    let elements = character.getAttribute('data-element').split(' ');
    elements.forEach(element => { 
        let circle = document.createElement('div');
        circle.classList.add('elem', element);

        if (element === 'none') {
            let line = document.createElement('div');
            line.classList.add('line');
            circle.appendChild(line);
        }

        wrapper.appendChild(circle);
    });

    character.appendChild(wrapper);
});
