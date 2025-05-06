document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const notesList = document.getElementById('notesList');
  const noteDetail = document.getElementById('noteDetail');

  async function loadNotes() {
    const res = await fetch('/notes');
    const notes = await res.json();
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <a href="#" data-id="${index}" class="note-link">${note.date} > ${note.name}</a>
          <a href="#" data-id="${index}" class="delete-link"> DELETE</a>
        `;
      notesList.appendChild(li);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value;
    const importance = form.importance.value;
    const content = form.content.value;

    await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, importance, content }),
    });

    form.reset();
    await loadNotes();
  });

  notesList.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    if (e.target.classList.contains('note-link')) {
      const res = await fetch(`/notes/${id}`);
      const note = await res.json();
      noteDetail.innerHTML = `
          <h2>Detail of "${note.name}"</h2>
          <ul>
            <li><b>date:</b> ${note.date}</li>
            <li><b>name:</b> ${note.name}</li>
            <li><b>importance:</b> ${note.importance}</li>
            <li><b>text:</b> ${note.content}</li>
          </ul>
        `;
    } else if (e.target.classList.contains('delete-link')) {
      await fetch(`/notes/${id}`, { method: 'DELETE' });
      noteDetail.innerHTML = '';
      await loadNotes();
    }
  });

  loadNotes();
});
