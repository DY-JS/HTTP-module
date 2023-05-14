import http from 'http';
import fs from 'fs';
import url from 'url';

const PORT = process.env.PORT || 8080;

//req.headers.host === localhost
//req.url - всё что после localhost:8080
// Запрос по адресу: 'http://localhost:8080/users/3/friends?sex=m&age=25';
const server = http.createServer((req, res) => {
  const normilizedURL = new url.URL(req.url, `http://${req.headers.host}`); //для созд-я объекта адр строки
  console.log(normilizedURL.searchParams.get('age')); //получили значения пар-ра запроса age - 25
  console.log(normilizedURL.searchParams.getAll('age')); //массив всех пар-ров age [ '25' ]

  const params = Object.fromEntries(normilizedURL.searchParams.entries()); //получили объект зн-й парам-в
  console.log(params); //{ sex: 'm', age: '25' }
  res.end();
});

//при переходе на http://localhost:8080/index.html
// const server = http.createServer((req, res) => {
//   //const fileName = req.url.slice(1) || 'index.html'; // из /index.html делаем index.html
//   const normilizedURL = new url.URL(req.url, `http://${req.headers.host}`); //для
//   const fileName = normilizedURL.pathname.slice(1) || 'index.html';
//   fs.readFile(`./public/${fileName}`, (error, data) => {
//     //читаем из index.html
//     if (!error) {
//       res.end(data);
//     }
//     res.statusCode = 404;
//     res.end();
//   });
// });

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.setHeader('Content-Type', 'text/plain'); //Content-Type для текста

//   res.end('Hello'); // res.end можно с текстом или без
//   //res.end();
// });

server.listen(PORT, () => {
  console.log(`Server statrted on ${PORT}`);
});
