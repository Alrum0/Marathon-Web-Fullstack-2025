const fs = require('fs');
const path = require('path');

class FileList {
  constructor() {
    this.directory = path.join(__dirname, 'tmp');
  }
  getList() {
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory);
    }
    return fs.readdirSync(this.directory);
  }

  hasFiles() {
    return this.getList().length > 0;
  }

  getHTMLList() {
    const files = this.getList();
    const listItems = files
      .map(
        (file) =>
          `<li><a href="/select-file?file=${encodeURIComponent(
            file
          )}">${file}</a></li>`
      )
      .join('');
    return `<ul>${listItems}</ul>`;
  }
}

module.exports = FileList;
