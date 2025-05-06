const fs = require('fs');
const path = require('path');

class NotePad {
  constructor(filename = 'notes.json') {
    const dir = path.join(__dirname, 'tmp');

    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp');
    }

    this.filename = path.join(dir, filename);
    this.notes = [];

    this.load();
  }

  load() {
    if (fs.existsSync(this.filename)) {
      const data = fs.readFileSync(this.filename, 'utf8');
      this.notes = JSON.parse(data);
    }
  }

  save() {
    fs.writeFileSync(this.filename, JSON.stringify(this.notes, null, 2));
  }

  getAllNotes() {
    return this.notes;
  }

  get(id) {
    return this.notes[id];
  }

  add(note) {
    this.notes.push(note);
    this.save();
  }

  remove(id) {
    this.notes.splice(id, 1);
    this.save();
  }
}

module.exports = NotePad;
