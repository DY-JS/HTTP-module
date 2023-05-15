import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('public')); //express.static - возвр. файлы из указ папки
//app.use(express.urlencoded({extended: true})) //для всего приложения будет urlencoded

//urlencoded установили urlencoded(для обработки данных из форм) только для app.post '/api'
app.post('/api', express.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
});

// app.post('/api', express.json()), (req, res) => {  //для json()
//   console.log(req.body)
// });

//-----------------------------------------------
//возвращаем файл или ошибку
// app.use(express.static(path.resolve('public'))); //express.static - возвр. файлы из указ папки

// app.use('/', (req, res) => {
//   res.sendStatus(404);
// });

// app.use('/', (req, res) => {
//   //res.sendStatus(201); //тектовое описание 201- Created  200-OK 503 -Service Unavailible
//   //res.send( { text: 'Hello' } ); //send автоматически опр. Content-Type
//   const filePath = path.resolve('public', 'index.html'); //path.resolve построит абсолютный путь public/index.html
//   res.sendFile(filePath);
// } );

//--------------------------------------------
// app.use('/', (req, res, next) => {
//   res.write('<h1>Home</h1>');
//   next(); // next() для создания цепочки вызовов
// });

//По адресу http://localhost:8080/123 отработает Home и Next Page
// app.use('/123', (req, res) => {
//   res.end('<h1>Next Page</h1>');
// });
//---------------------------------------------

app.listen(PORT, () => {
  console.log(`Server statrted on ${PORT}`);
});
