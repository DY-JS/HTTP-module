import http from 'http';

const PORT = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain'); //Content-Type lkz ntrcnf

  res.end('Hello'); // res.end можно с текстом или без
  //res.end();
});

server.listen(PORT, () => {
  console.log(`Server statrted on ${PORT}`);
});
