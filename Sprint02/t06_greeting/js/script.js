let firstname = prompt("What is your first name?");
let lastname = prompt("What is your last name?");

if (/^[a-zA-Z]+$/.test(firstname) && /^[a-zA-Z]+$/.test(lastname)) {
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

    let fullname = `Hello, ${firstname} ${lastname}!`;
    alert(fullname);
    console.log(fullname);
} else {
    alert('Wrong input!');
    console.log('Wrong input!');
}