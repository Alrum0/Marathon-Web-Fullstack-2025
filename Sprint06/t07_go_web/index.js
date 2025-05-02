const http = require('http');
const { normalRouter } = require('./normal-router');
const quantumRouter = require('./quantum-router');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/normal') {
    normalRouter(req, res);
  } else if (req.url === '/quantum') {
    quantumRouter(req, res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
