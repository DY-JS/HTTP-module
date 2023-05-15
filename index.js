import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import zlib, { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';

const PORT = process.env.PORT || 8080;

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`); //объект с ключами данных поисковой строки
  const fileName = url.pathname.slice(1) || 'index.html'; // url.pathname.slice(1) - избавились от /
  const filePath = path.resolve('public', fileName); // объединили public/...html

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end('File does not exist');
    return;
  }
  console.log(url);
  res.setHeader('Content-Encoding', 'gzip');

  const file = fs.createReadStream(filePath); //считали в fileStream
  //const gzip = zlib.createBrotliCompress() //более современная
  const gzip = zlib.createGzip(); //сжатие

  file
    .on('error', (error) => {})
    .pipe(gzip) //передали считанный файл в gzip
    .on('error', (error) => {})
    .pipe(res) //передали считанный файл в res
    .on('error', (error) => {});
  //pipeline(file, gzip, res, (error) => {}); //можно объединить все ресурсы и уст один обработчик ошибок

  gzip.pipe(fs.createWriteStream(filePath + '.gzip'));

  file.on('error', (error) => {
    res.statusCode = 500;
    res.end('Some error');
  });
  // 'close' - это метод как для успешного так и для неудачного завершения ответа
  //file.destroy() вызываем в событии 'close' чтобы закрыть файл при разрыве соединения с браузером
  res.on('close', () => {
    file.destroy();
  });
});

// server.on('request', (req, res) => {
//   if (req.url === '/donload') {
//     //если путь в адресной строке download - скачиваем файл
//     const fileStream = fs.createReadStream('./video.mp4'); //считали в fileStream

//     res.setHeader('Content-Type', 'video/mp4');
//     res.setHeader('Content-Type', 'attachment; filename=video/mp4'); //чтобы браузер воспринял как attachment

//     fileStream.pipe(res); //записали из fileStream в ответ res

//     fileStream.on('error', (error) => {
//       res.statusCode = 500;
//       res.end( 'Server error' );
//     } );
//   } else {
//     //если путь в адресной строке не download - возвращаем ссылку на скачивание
//     res.setHeader('Content-Type', 'text/html');
//     res.end(`<a href="/download" target="_blank">Download</a>`);
//   }
// });

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

server.on('error', () => {});

server.listen(PORT, () => {
  console.log(`Server statrted on ${PORT}`);
});
