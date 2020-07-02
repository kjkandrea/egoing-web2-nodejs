const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template');

http.createServer((request,response) => {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  let title = queryData.id;

  //console.log(url.parse(_url, true))
  
  if (pathname === '/') {
    if(!queryData.id){
      fs.readdir(`${__dirname}/data`, (error, filelist) => {
        title = 'Welcome';
        const description  = 'Hello, Node.js'
        const list = template.list(filelist);
        const html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="create">create</a>`
        );

        response.writeHead(200);
        response.end(html);
      })
    } else {
      fs.readdir(`${__dirname}/data`, (error, filelist) => {
        fs.readFile(`data/${queryData.id}`, (error, description) => {
          const list = template.list(filelist);
          const html = template.HTML(
            title,
            list, 
            `<h2>${title}</h2>${description}`,
            `
              <a href="/create">create</a>
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post" onsubmit="">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
              </form>
            `
          );

          response.writeHead(200);
          response.end(html);
        })
      })
    };
  } else if (pathname === '/create') {
    fs.readdir(`${__dirname}/data`, (error, filelist) => {
      title = 'WEB - create';
      const list = template.list(filelist);
      const form = `
        <form action="/create_process" method="POST">
          <p>
            <input type="text" name="title" placeholder="title">
          </p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `;
      const html = template.HTML(
        title,
        list,
        `<h2>${title}</h2>${form}`,
        ''
      );

      response.writeHead(200);
      response.end(html);
    });
  } else if ( pathname === '/create_process' ) {
    let body = '';
    request.on('data', (data) => {
      body = body + data
    });
    request.on('end', () => {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf-8', (error) => {
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      })
    });
  } else if ( pathname === '/update' ) {
    fs.readdir(`${__dirname}/data`, (error, filelist) => {
      fs.readFile(`data/${queryData.id}`, (error, description) => {
        const list = template.list(filelist);
        const html = template.HTML(
          title,
          list, 
          `
            <form action="/update_process" method="POST">
              <input type="hidden" name="id" value="${title}">
              <p>
                <input type="text" name="title" placeholder="title" value="${title}">
              </p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `,
          `
            <a href="create">create</a>
            <a href="/update?id=${title}">update</a>
          `
        );

        response.writeHead(200);
        response.end(html);
      })
    })
  } else if ( pathname === '/update_process') {
    let body = '';
    request.on('data', (data) => {
      body = body + data
    });
    request.on('end', () => {
      const post = qs.parse(body);
      const id = post.id;
      const title = post.title;
      const description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, (error) => {
        fs.writeFile(`data/${title}`, description, 'utf-8', (error) => {
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      })
    });
  } else if ( pathname === '/delete_process') {
    let body = '';
    request.on('data', (data) => {
      body = body + data
    });
    request.on('end', () => {
      const post = qs.parse(body);
      const id = post.id;
      fs.unlink(`data/${id}`, (error) => {
        response.writeHead(302, {Location: `/`});
          response.end();
      })
    });
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
}).listen(3000);