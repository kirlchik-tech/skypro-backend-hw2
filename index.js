const http = require('http');
const fs = require('fs');
const path = require('path');

// Порт берется из переменной окружения, либо используется 3003
const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const params = url.searchParams;

  // 1. Если никакие параметры не переданы
  if (Array.from(params).length === 0) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, World!');
    return;
  }

  // 2. Обработка параметра ?hello
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

  // 3. Обработка параметра ?users
  if (params.has('users')) {
    const filePath = path.join(__dirname, 'data', 'users.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Если файла нет или ошибка чтения файла
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(data);
    });
    return;
  }

  // 4. Если переданы любые другие параметры (ошибка 500)
  response.writeHead(500, { 'Content-Type': 'text/plain' });
  response.end('');
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});