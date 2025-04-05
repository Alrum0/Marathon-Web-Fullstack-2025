let animal = prompt('What animal is the superhero most similar to?');

if (!/^[A-Za-z]{1,20}$/.test(animal)) {
    alert('Error: Animal name must contain only letters and must be from 1 to 20 characters long');
} else {
    let gender = prompt('Is the superhero male or female? Leave blank if unknown or other');
    if (!/^(male | female)?/i.test(gender)) {
        alert('Error: Gender must be male, female or blank');
    } else {
        let age = prompt('How old is the superhero?');
        if (!/^[1-9][0-9]{0,4}$/.test(age)) {
            alert('Error: Age must contains only digits and must be from 1 to 5 characters long.');
        } else {
           let description;
           if(gender.toLowerCase() === 'male') {
            description = age < 18 ? 'Boy' : 'Man';
           } else if (gender.toLowerCase() === 'female') {
            description = age < 18 ? 'girl' : 'woman';
           } else {
            description = age < 18 ? 'kid' : 'hero';
           }

           alert(`The superhero name is: ${animal} - ${description}`);
        }
    }
}