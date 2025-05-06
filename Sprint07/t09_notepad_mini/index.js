const express = require('express');
const path = require('path');
const NotePadClass = require('./NotePad');
const Note = require('./Note');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());

const NotePad = new NotePadClass();

app.get('/notes', (req, res) => {
  res.json(NotePad.getAllNotes());
});

app.post('/notes', (req, res) => {
  const { name, importance, content } = req.body;
  const date = new Date()
    .toLocaleString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(',', '');
  const note = { name, importance, content, date };
  NotePad.add(note);
  res.json({ message: 'Note added' });
});

app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = NotePad.get(id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  NotePad.remove(id);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
