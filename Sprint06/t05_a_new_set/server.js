const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '/index.html') {
      sendFile(res, 'index.html', 'text/html');
    } else if (req.url === '/style.css') {
      sendFile(res, 'style.css', 'text/css');
    } else if (req.url === '/script.js') {
      sendFile(res, 'script.js', 'application/javascript');
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const boundary = req.headers['content-type'].split('boundary=')[1];

      const parts = body
        .split(`--${boundary}`)
        .filter((part) => part.includes('Content-Disposition'));

      const fields = {};

      parts.forEach((part) => {
        const [info, value] = part.split('\r\n\r\n');
        const nameMatch = info.match(/name="(.+?)"/);
        if (nameMatch) {
          const name = nameMatch[1];
          if (info.includes('filename="')) {
            const filenameMatch = info.match(/filename="(.+?)"/);
            fields[name] = filenameMatch ? filenameMatch[1] : '';
          } else {
            fields[name] = value.trim();
          }
        }
      });

      let responseText = '<pre>POST\n\nArray\n{\n';
      for (const [key, value] of Object.entries(fields)) {
        responseText += `    [${key}] => ${value}\n`;
      }
      responseText += '}</pre>';

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(responseText);
    });
  }
});

function sendFile(res, filename, contentType) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
