const express = require('express');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

let previousResults = {
  utf8: '',
  iso: '',
  win: '',
};

function getIsoValue(iso) {
  return iso.toString() === '?' ? 'EUR' : iso;
}

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

app.post('/convert', (req, res) => {
  const { inputString } = req.body;
  let charsets = req.body.charset;

  if (!Array.isArray(charsets)) {
    charsets = charsets ? [charsets] : [];
  }

  if (!inputString) {
    return res.status(400).send('<h1>Bad Request</h1>');
  }

  try {
    if (charsets.includes('UTF-8')) {
      previousResults.utf8 = iconv.encode(inputString, 'utf8');
    }
    if (charsets.includes('ISO-8859-1')) {
      previousResults.iso = iconv.encode(inputString, 'latin1');
    }
    if (charsets.includes('windows-1252')) {
      previousResults.win = iconv.encode(inputString, 'windows-1252');
    }

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Charset Converter</title>
      </head>
      <body>
          <h1>Charset Converter</h1>
          <form action="/convert" method="post" id="converter-form">
              <label for="inputString">Change charset:</label>
              <input type="text" id="inputString" name="inputString" value="${inputString}" required><br><br>

              <label for="charset">Select charset or several characters:</label>
              <select name="charset" id="charset" multiple size="3">
                  <option value="UTF-8" ${
                    charsets.includes('UTF-8') ? 'selected' : ''
                  }>UTF-8</option>
                  <option value="ISO-8859-1" ${
                    charsets.includes('ISO-8859-1') ? 'selected' : ''
                  }>ISO-8859-1</option>
                  <option value="windows-1252" ${
                    charsets.includes('windows-1252') ? 'selected' : ''
                  }>Windows-1252</option>
              </select>

              <button type="submit">Convert</button>
              <button type="button" id="clear-button">Clear All</button>
          </form>

          <div id="output">
              <h2>Input string:</h2>
              <textarea readonly>${inputString}</textarea>

              <h3>UTF-8</h3>
              <textarea readonly>${previousResults.utf8}</textarea>

              <h3>ISO-8859-1</h3>
              <textarea readonly>${
                previousResults.iso.toString() === '?'
                  ? 'EUR'
                  : previousResults.iso
              }</textarea>

              <h3>Windows-1252</h3>
              <textarea readonly>${previousResults.win}</textarea>
          </div>

          <script>
            document.getElementById('clear-button').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('inputString').value = '';
            document.querySelectorAll('#output textarea').forEach(ta => ta.value = '');
            const options = document.querySelectorAll('#charset option');
            options.forEach(option => option.selected = false);
            fetch('/clear', { method: 'POST' });
        });
    </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Conversion Error</h1>');
  }
});

app.post('/clear', (req, res) => {
  previousResults = {
    inputString: '',
    utf8: '',
    iso: '',
    win: '',
  };
  res.redirect('/');
});

app.use((req, res) => {
  res.status(404).send('<h1>Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
