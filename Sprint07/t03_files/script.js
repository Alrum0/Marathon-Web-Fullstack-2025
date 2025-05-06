document.addEventListener('DOMContentLoaded', () => {
  fetch('/list-files')
    .then((response) => response.json())
    .then((data) => {
      const filesList = document.getElementById('fileList');
      filesList.innerHTML = '';
      data.files.forEach((file) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = file;
        a.onclick = () => selectFile(file);
        li.appendChild(a);
        filesList.appendChild(li);
      });
    });
});

function selectFile(fileName) {
  fetch(`/select-file?file=${fileName}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('selectedFileName').textContent = data.fileName;
      document.getElementById('selectedFileContent').textContent = data.content;
      document.getElementById('deleteFileName').value = data.fileName;
      document.getElementById('selectedFile').style.display = 'block';
    });
}
