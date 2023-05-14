import http from 'http';
import axios from 'axios';
//const http = require('http');

const BASE = 'http://localhost:8080';
const pathname = '/users/3/friends';
const search = '?sex=m&age=25';

const href = BASE + pathname + search;

axios.get(href).catch(() => console.log('Error ocured'));

// axios
//   .get('http://localhost:8080')
//   .then((res) => {
//     console.log(res.status);
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.log('error');
//   });

// const req = http.request('http://localhost:8080', (res) => {
//   console.log(res.statusCode);
//   res.setEncoding('utf8');
//   res.on('data', (data) => {
//     //подписались на событие дата
//     console.log(data);
//     //process.stdout.write(data); //если без res.setEncoding('utf8')
//   });
// });

// // обработка ошибки
// req.on('error', (error) => {
//   //подписались на событие error
//   console.error(error);
// });

// req.end(); //обязательно закрыть запрос
