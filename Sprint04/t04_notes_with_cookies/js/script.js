const addCookiesButton = document.getElementById('addCookies');
const clearCookiesButton = document.getElementById('clearCookies');
const noteInput = document.getElementById('noteInput');
const notesArchive = document.getElementById('notesArchive');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

addCookiesButton.addEventListener('click', () => {
    let note = noteInput.value.trim();
    if (note === '') {
        alert('Please enter a note.');
        return;
    }

    const cookieValue = getCookie('notes');
    let existingNotes = [];
    
    if (cookieValue) {
        try {
            existingNotes = JSON.parse(cookieValue);
        } catch (e) {
            console.error('Error parsing notes cookie:', e);
        }
    }
    
    existingNotes.push(note);

    setCookie('notes', JSON.stringify(existingNotes), 30);

    displayCookies();
    noteInput.value = '';
});

clearCookiesButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all cookies?')) {
        document.cookie = 'notes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        notesArchive.textContent = '[Empty]';
    }
});

const displayCookies = () => {
    const cookieValue = getCookie('notes');
    let notes = [];
    
    if (cookieValue) {
        try {
            notes = JSON.parse(cookieValue);
        } catch (e) {
            console.error('Error parsing notes cookie:', e);
        }
    }
    
    if (notes.length === 0) {
        notesArchive.textContent = '[Empty]';
    } else {
        notesArchive.innerHTML = notes.map(note => 
            `<div class="note-item">${note.replace(/\n/g, '<br>')}</div>`
        ).join('');
    }
}

displayCookies();