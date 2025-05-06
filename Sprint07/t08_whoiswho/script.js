let csvData = [];

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const selectedFile = fileInput.files[0];

  if (!selectedFile) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const base64File = event.target.result;

    fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: base64File }),
    })
      .then((response) => response.json())
      .then((data) => {
        csvData = data.data;
        displayTable(csvData);
        populateFilterOptions(csvData);
        document.getElementById('filterSection').style.display = 'block';
      });
  };

  reader.readAsDataURL(selectedFile);
}

function displayTable(data) {
  const table = document.getElementById('csvTable');
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  thead.innerHTML = '';
  tbody.innerHTML = '';

  if (data.length === 0) return;

  const columns = Object.keys(data[0]);

  const headerRow = document.createElement('tr');
  columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  data.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((column) => {
      const td = document.createElement('td');
      td.textContent = row[column];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function populateFilterOptions(data) {
  const columns = Object.keys(data[0]);
  const columnSelect = document.getElementById('column');
  columnSelect.innerHTML = '';

  columns.forEach((column) => {
    const option = document.createElement('option');
    option.value = column;
    option.textContent = column;
    columnSelect.appendChild(option);
  });
}

function applyFilter() {
  const column = document.getElementById('column').value;
  const value = document.getElementById('filterValue').value;

  fetch(`/filter?column=${column}&value=${value}`)
    .then((response) => response.json())
    .then((data) => {
      displayTable(data.data);
    });
}
