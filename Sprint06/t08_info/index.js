const http = require('http');
const os = require('os');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  console.log(`Name of executed script:`, __filename);
  console.log('Arguments passed to the script', process.argv);
  console.log('IP address of the server:', getServerIp());
  console.log('Name of host invoking the current script:', os.hostname());
  console.log('Name and version of the information protocol:', req.httpVersion);
  console.log('Query method:', req.method);
  console.log('User-Agent information:', req.headers['user-agent']);
  console.log('IP address of the client', req.socket.remoteAddress);
  console.log('URL Parameters:', parsedUrl.query);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Check the console');
});

function getServerIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const ifaceDetail of iface) {
      if (ifaceDetail.family === 'IPv4' && !ifaceDetail.internal) {
        return ifaceDetail.address;
      }
    }
  }
  return '127.0.0.1';
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
