document.addEventListener("DOMContentLoaded", function () {

    const noteText = document.getElementById('noteInput');
    const addButton = document.getElementById('addStotrage');
    const clearButton = document.getElementById('clearStorage');
    const displayNotes = document.getElementById('notesArchive');

    function display() {
        displayNotes.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++){
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let note = document.createElement('div');
            note.textContent = `${key}: ${value}`;
            displayNotes.appendChild(note);
        }
    }

    addButton.addEventListener('click', () => {
        let note = noteText.value.trim();
        if (note !== '') {
            let date = new Date().toLocaleString();
            localStorage.setItem(date, note);
            noteText.value = '';
            display();
        } else {
            alert('Please enter a note.');
        }
    })

    clearButton.addEventListener('click', () => {
         if (confirm('Are you sure you want to clear all notes?')) {
            localStorage.clear();
            display();
        }
    })

    display();

})