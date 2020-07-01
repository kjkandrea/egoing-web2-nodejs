const http = require('http');
const fs = require('fs');
const url = require('url');

const template = {
  HTML : function(title, list, body) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
      </body>
      </html>
    `
  },
  List : function(filelist) {
    let list = '<ul>';
    for( let i = 0; i < filelist.length; i++ ){
      list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list += '</ul>';
    return list;
  }
}

http.createServer((request,response) => {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  let title = queryData.id;

  //console.log(url.parse(_url, true))
  
  if(pathname === '/'){
    if(!queryData.id){
      fs.readdir(`${__dirname}/data`, (error, filelist) => {
        title = 'Welcome';
        const description  = 'Hello, Node.js'
        const list = template.List(filelist);
        const output = template.HTML(title, list, `<h2>${title}</h2>${description}`);

        response.writeHead(200);
        response.end(output);
      })
    } else {
      fs.readdir(`${__dirname}/data`, (error, filelist) => {
        fs.readFile(`data/${queryData.id}`, (error, description) => {
          const list = template.List(filelist);
          const output = template.HTML(title, list, `<h2>${title}</h2>${description}`);

          response.writeHead(200);
          response.end(output);
        })
      })
    };
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
}).listen(3000);