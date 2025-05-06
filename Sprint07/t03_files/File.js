const fs = require('fs');
const path = require('path');

class File {
  constructor(filename) {
    this.filename = path.join(__dirname, 'tmp', filename);
  }

  write(content) {
    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp');
    }
    fs.appendFileSync(this.filename, content);
  }

  read() {
    return fs.readFileSync(this.filename, 'utf8');
  }

  delete() {
    fs.unlinkSync(this.filename);
  }
}

module.exports = File;
