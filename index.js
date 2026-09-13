const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const params = url.searchParams;

  if (Array.from(params).length === 0) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, World!');
    return;
  }

  if (params.has('hello')) {
    const name = params.get('hello');
    if (name) {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`Hello, ${name}.`);
    } else {
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      response.end('Enter a name');
    }
    return;
  }

  if (params.has('users')) {
    const filePath = path.join(__dirname, 'data', 'users.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(data);
    });
    return;
  }

  response.writeHead(500, { 'Content-Type': 'text/plain' });
  response.end('');
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});