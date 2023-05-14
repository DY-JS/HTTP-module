import http from 'http';
import fs from 'fs';
import url from 'url';

const PORT = process.env.PORT || 8080;

const server = new http.Server();
// вместо const server = http.createServer((req, res) => {
// тогда - server.on('request', (req, res) => {...})

//pipe() перенаправляем(записываем) контент из одного рес-са в другой
// process.stdin.pipe(process.stdout); //печатаем в консоли и сразу с пом. pipe() перенаправляем это в поток вывода

// process.stdin.on('data', (chunk) => {
//   process.stdout.write('> ' + chunk);
// });
//виды  Readable потоков:
// -new Readable() //emitter event - 'end'
// -fs.createReadStream('./package.json); - чтение из файла
// -preocess.stdin
// -req - чтение запроса

//виды  Writable потоков:
// -new Writable() //emitter event - 'finish'
// -fs.createWriteStream('./copy); - запись в файл
// -preocess.stdout - вывод в консоль
// -res - запись в ответ

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  for (let i = 5; i > 0; i--) {
    setTimeout(() => {
      res.write(`<p>${i}</p>`);
    }, (5 - i) * 1000);
  }

  setTimeout(() => {
    res.end('<p>Done!</p>');
  }, 5000);
});

server.on('error', () => {});

server.listen(PORT, () => {
  console.log(`Server statrted on ${PORT}`);
});
