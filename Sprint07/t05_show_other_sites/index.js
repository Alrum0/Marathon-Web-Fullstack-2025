const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('<h1>Server problem</h1>');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/fetchUrl', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const body = dom.window.document.body.innerHTML;

    const escaped = body
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Show Other Sites</title>
  </head>
  <body>
      <h1>Show other sites</h1>
      <form action="/fetchUrl" method="post">
          <label for="url">url:</label>
          <input type="text" name="url" id="url" required>
          <button type="submit">Go</button>
          <a href="/">BACK</a>
      </form>
      <hr>
      <p>url: ${url}</p>
      <div style="white-space: pre-wrap; border-top: 1px solid #888; padding-top: 10px;">
  ${escaped}
      </div>
  </body>
  </html>
  `);
  } catch (err) {
    res.status(500).send(`<h1>Error loading URL</h1><p>${err.message}</p>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
