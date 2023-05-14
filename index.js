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
  if (req.url === '/donload') {
    //если путь в адресной строке download - скачиваем файл
    const fileStream = fs.createReadStream('./video.mp4'); //считали в fileStream

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Type', 'attachment; filename=video/mp4'); //чтобы браузер воспринял как attachment

    fileStream.pipe(res); //записали из fileStream в ответ res

    fileStream.on('error', (error) => {
      res.statusCode = 500;
      res.end('Server error');
    });
  } else {
    //если путь в адресной строке не download - возвращаем ссылку на скачивание
    res.setHeader('Content-Type', 'text/html');
    res.end(`<a href="/download" target="_blank">Download</a>`);
  }
});

// server.on('request', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');

//   for (let i = 5; i > 0; i--) {
//     setTimeout(() => {
//       res.write(`<p>${i}</p>`);
//     }, (5 - i) * 1000);
//   }

//   setTimeout(() => {
//     res.end('<p>Done!</p>');
//   }, 5000);
// });

// server.on('error', () => {});

server.listen(PORT, () => {
  console.log(`Server statrted on ${PORT}`);
});
