const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => {
  const path = url.parse(request.url, true).pathname;
  console.log(path);
}).listen(3000);