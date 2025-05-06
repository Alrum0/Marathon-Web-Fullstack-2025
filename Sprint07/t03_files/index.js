const express = require('express');
const path = require('path');
const fs = require('fs');
const File = require('./File');
const FileList = require('./FileList');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // for script.js

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/createFile', (req, res) => {
  const { filename, fileContent } = req.body;
  const file = new File(filename);
  file.write(fileContent);
  res.redirect('/');
});

app.get('/list-files', (req, res) => {
  const fileList = new FileList();
  res.json({ files: fileList.getList() });
});

app.get('/select-file', (req, res) => {
  const { file } = req.query;
  const selectedFile = new File(file);
  const content = selectedFile.read();
  res.json({ fileName: file, content });
});

app.post('/delete-file', (req, res) => {
  const { fileName } = req.body;
  const file = new File(fileName);
  file.delete();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server starting at http://localhost:${PORT}`);
});
