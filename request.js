import http from 'http';

const req = http.request('http://localhost:8080', (res) => {
  console.log(res.statusCode);
  res.setEncoding('utf8');
  res.on('data', (data) => {
    //подписались на событие дата
    console.log(data);
    //process.stdout.write(data); //если без res.detEncoding('utf8')
  });
});

// обработка ошибки
req.on('error', (error) => {
  //подписались на событие error
  console.error(error);
});

req.end(); //обязательно закрыть запрос
