# WEB2 - Node.js

Node.js는 자바스크립트(JavaScript)로 서버 프로그래밍을 할 수 있도록 해주는 플랫폼이다.

## Install

[nodejs.org](https://nodejs.org/)에서 LTS(장기지원) 버전 다운로드 

인스톨 후 다음 커맨드로 버전 확인

```
node --version // v12.13.0
```

## 기본 구성

수업안내에 따라 다음과 같이 간단한 구조의 html을 디렉토리 안에 삽입하고 `main.js`를 구현하였다.

**파일 트리**

```
Root/
--| main.js
--| index.html
--| 1.html
--| 2.html
--| 3.html
```

**main.js**

`main.js`의 내용은 다음과 같다.

``` javascript
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(url == '/'){
      url = '/index.html';
    }
    if(url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url)
    response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);
```

## 서버 실행

루트 디렉토리에서 다음과 같은 커맨드를 입력한다.

```
node main.js
```

커맨드 입력 후 브라우저에서 http://localhost:3000 으로 접속하면 간단한 html 어플리케이션이 실행되는 것을 볼 수 있다.

## URL의 이해

http://opentutorials.org:3000/main?id=HTML&page=12

* **http** : **포로토콜(protocol)** 통신규칙. 사용자가 서버에 접속할 때 어떤 방식으로 통신할 것 인가? (ex : http, https, ftp)
* **opentutorials.org** : **호스트 - 도메인(host - domain)** 특정한 인터넷에 연결되어있는 컴퓨터를 가르키는 구조
* **3000** : **포트 번호(port)** 한대의 컴퓨터에는 여러 개의 서버가 있을 수 있음. 3000이란 3000번 포트에 연결되어있는 서버와 통신하겠다는 뜻
* **main** : **패스(path)** 어떤 디렉토리의 어떤 파일인지를 가르킴
* **?id=HTML?page=12** : **쿼리스트링(query string)** 

### Query String

쿼리스트링 이란? 웹서버에 어떠한 정보를 전달할때 사용하는 것

`?id=HTML&page=12` : 
내가 읽고 싶은 정보는 HTML이고(`id=HTML`) 12페이지(`page=12`) 이다.

* 쿼리스트링의 시작은 물음표(`?`)
* 값과 값 사이에는 amp(`&`)
* 값과 값 사이는 equal(`=`)


`readdir.js`를 실행하면 실행한 디렉토리내의 파일 목록이 배열로 로그에 표시된다.


## 모듈(Module)

웹서버를 처음부터 만드는것은 굉장히 어려운 일이다. 이에 Nodejs는 **모듈** 이란 도구를 제공한다.
`main.js`를 해석하며 Nodejs 모듈 개념에 대해 이해하여보자.

``` javascript
const http = require('http');
```

require를 '필수적으로 요구되는 것'의 의미로 보면 위 코드는 다음의 의미를 지닌다. 

> http를 필수적으로 요구하며 이 요구 사항의 이름을 http로 명명한다.

모듈은 부품이다. 모듈이라는 부품을 사용하기 위해서는 require라는 함수로 호출한다.

모듈을 활용하기 위해서 각 모듈의 [DOCS](https://nodejs.org/en/docs/) 를 참고하자.

### 내부 모듈 OS 사용해보기

[DOCS : API : OS](https://nodejs.org/docs/latest-v12.x/api/os.html)를 참고하여 OS정보를 보여주는 `module.js` 를 작성하여 보자.

``` javascript
// module.js

const os = require('os');

console.log(os.platform())
```

실행 커맨드를 입력해보자.

```
node module.js // // darwin
```

### 내부 모듈 활용

#### url 파싱하기

``` javascript
const http = require('http');
const url = require('url');

http.createServer((request,response) => {
  const urlObj = url.parse(_url, true)
  console.log(urlObj)
}).listen(3000);
```

#### url.parse로 쿼리데이터 파싱하기

쿼리데이터를 파싱하기 위해 `const url = require('url');` 을 통해 모듈을 사용한다.

그리고 코드를 다음 같이 변경 후 실행하여 보자.

``` javascript
const http = require('http');
const url = require('url');

http.createServer((request,response) => {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  console.log(queryData)
}).listen(3000);
```

[localhost:3000/?id=HTML](http://localhost:3000/?id=HTML) 주소로 요청 하면 `[Object: null prototype] { id: 'HTML' }` 이란 로그가 출력된다.
id 키 값을 가진 객체가 리턴되는것을 볼 수 있다.

#### fs.readFile 로 파일 내용 읽어오기

node.js로 특정 .txt 파일의 내용을 읽어오는 연습을 해보도록 하자.

다음과 같은 파일을 작성하고 동일한 디렉토리에 sample.txt를 작성하였다.

``` javascript
// fileread.js

const fs = require('fs');

fs.readFile('./sample.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

`fileread.js`를 실행하면 파일의 내용이 로그에 표시된다.

#### fs.readdir 로 파일 목록 읽어오기

fs.readdir 을 이용하여 특정 디렉토리내의 파일 목록을 얻고 싶을때에 다음과 같이 할 수 있다.

``` javascript
// readdir.js

const testFolder = './'
const fs = require('fs');

fs.readdir(testFolder, (error, filelist) => {
  console.log(filelist)
})
```

## Node.js가 제공하지 않는 모듈을 사용해보자

Node.js는 기본적으로 HTTP, OS와 같은 여러 내장 모듈을 제공한다.
내장 모듈 뿐만 아닌 **외부 모듈을 설치하여 사용할 수 있다.**

## NPM

NPM은 *Node Package Manager*의 약어이다. 
NPM은 외부 모듈의 설치, 삭제, 업그레이드, 의존성 관리 역할을 한다.
NPM의 패키지 중 하나인 `underscore.js`를 살펴보며 패키지와 모듈 개념에 대하여 이해하여 보자.

### npm init

npm init(이니셜라이즈)는 현재 개발환경을 패키지로 관리하기 위한 일련의 과정이다.

다음 커맨드를 입력하여보자.

```
npm init
```

커맨드 입력 후 이름 지정, 버전, 부가설명 등 여러 옵션을 입력하라고 나오는데 입력하여 주면된다.

입력이 끝나면 프로젝트 디렉토리내에 `package.json`이 생성되며 내용은 다음과 같다.

``` json
{
  "name": "egoing-web2-nodejs",
  "version": "1.0.0",
  "description": "Node.js 이해하기",
  "main": "main.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "start": "node main.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/kjkandrea/egoing-web2-nodejs.git"
  },
  "author": "andrea",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/kjkandrea/egoing-web2-nodejs/issues"
  },
  "homepage": "https://github.com/kjkandrea/egoing-web2-nodejs#readme"
}
```

### 외부 모듈 underscore.js 사용해보기

**underscore.js** 란 `_.underscore` 식의 독자적인 메서드를 제공하는 라이브러리 이다.

https://underscorejs.org/

#### Install

```
npm i underscore --save
```

`--save`를 붙임으로서 package.json 의 dependencies 의존성에 추가한다.

``` json
// package.json

"dependencies": {
  "underscore": "^1.10.2"
},
```

> dependencies에 포함된 항목은 이 패키지를 실행하는데 반드시 필요하다는 의미이다.

#### How To Use

`underscore-sample.js`란 파일을 디렉토리에 추가하고 underscore를 require로 불러들여 _라는 상수에 할당해주겠다.

``` javascript
// underscore-sample.js
const _ = require('underscore')
```

임의의 배열을 arr이란 명칭으로 생성하고 다음과 같이 underscore에서 제공하는 `first`, `last` 를 사용하여 보자.

``` javascript
// underscore-sample.js
const _ = require('underscore')
const arr = [3, 6, 9, 1, 12]

console.log(arr[0],' equal ',_.first(arr)) // 3  equal  3
console.log(arr[arr.length - 1],' equal ',_.last(arr)) // 12  equal  12
```

### 개념 정리

* HTTP, OS와 같은 언어(여기에서는 Node.js)에서 제공하는 **내부 모듈**은 `require`를 통해 사용할 수 있다.
* underscore와 같은 **외부 모듈**은 NPM을 통해 인스톨함으로써 나의 패키지에 종속성을 추가하여 `require`를 통해 사용할 수 있다.


## 서버 생성하기

서버를 생성하기 위해서는 http 모듈과 http 내부의 createServer 메서드를 사용한다. `server.js`를 생성하여 이를 이해해보자.

``` javascript
// server.js

const http = require('http'); // 서버를 만드는 모듈 불러옴
http.createServer((request, response) => { // 서버 만드는 메소드
  console.log('server start!');
}).listen(3000);
```

`node server.js` 명령어를 입력하면 listen에 입력된 포트번호로 서버가 열린다.

### createServer : request, response 

`createServer` 메소드 콜백의 매개변수인 `request`와 `response` 에 대해 이해하여야한다. 

우선 HTTP를 공부하며 배운 정의를 다시한번 기억하자.

* Request(요청) : ‘localhost 내의 3000번 포트’ 의 내용을 보여주세요.’
* Response(응답) : ‘내용 데이터 여기 있습니다.’

#### Request

**request**는 곧 요청이다.

서버를 실행하고 http://localhost:3000 로 접근한것 자체가 서버에 요청을 한 행위이다.
서버는 대기하고 있다가 요청이 들어오면 그제서야 **요청(request)을 해석하여 응답(response)을 해주고자 동작 한다.**

#### Response

**response** 는 곧 응답이다.

서버를 실행하고 http://localhost:3000 로 접근하여 브라우저에 아무것도 표시되지 않는 이유는 응답(response)을 설정하지 않았기 때문이다.

#### 서버의 동작방식

정리해보자면 서버의 동작방식은 다음과 같다.

1. request 가 발생
2. 서버에서 이를 처리
3. response를 반환

### request 를 처리하기

createServer 메소드의 인자인 request를 사용하여 요청을 처리해보자.

``` javascript
const http = require('http'); // 서버를 만드는 모듈 불러옴
http.createServer((request, response) => { // 서버 만드는 메소드
  return request
    .on('error', (err) => { // 요청에 에러가 있으면
      console.error(err);
    })
    .on('data', (data) => { // 요청에 데이터가 있으면
      console.log(data);
    })
    .on('end', () => { // 요청의 데이터가 모두 받아졌으면
      console.log('요청을 처리하였습니다.')
    });
}).listen(3000);
```

구문을 하나하나 살펴보자

`request.on('error', (err) => { console.error(err); })`

=> 요청에는 에러가 있을 수 있다. 이러한 에러가 발생하였는데 처리를 해주지않는다면 **Node.js서버는 다운된다**

`request.on('data', (data) => { // something })`

=> request에 data가 있을 경우 처리하는 부분이다. 

`request.on('end', () => { console.log('요청을 처리하였습니다.') });`

=> 모든 요청을 처리하면 '요청을 처리하였습니다.' 를 볼 수 있다.

우리는 '요청을 처리하였습니다'를 보게되었지만 브라우저는 아무것도 표시하지않고 계속 로딩됨을 확인할 수 있다.
현재상태로는 서버가 아무런 응답(response)을 하지 않기 때문이다.

### response 를 처리하기

모든 요청이 처리되면 (`response.end`) 우린 이제 브라우저에 다음과 같이 응답을 전송할 수 있다.

``` javascript
const http = require('http'); // 서버를 만드는 모듈 불러옴
http.createServer((request, response) => { // 서버 만드는 메소드
  return request
    .on('error', (err) => { // 요청에 에러가 있으면
      console.error(err);
    })
    .on('data', (data) => { // 요청에 데이터가 있으면
      console.log(data);
    })
    .on('end', () => { // 요청의 데이터가 모두 받아졌으면
      response.on('error', (err) => { // 응답에 에러가 있으면
        console.error(err);
      });
      response.statusCode = 200; // 성공 임을 200 응답 상태 코드를 통해 알려준다.
      response.setHeader('Content-Type', 'text/plain'); // header를 설정한다.  
      response.write('this is my first response.\n'); // body에 정보를 넣는다.
      response.end('Hello, World!'); // 정보 탑재 후 브라우저로 전송
    });
}).listen(3000);
```

마찬가지로 구문을 하나하나 살펴보자.

`response.on('error', (err) => { console.error(err); });`

=> 응답에는 에러가 있을 수 있다. 이러한 에러가 발생하였는데 처리를 해주지않는다면 **Node.js서버는 다운된다**

`response.statusCode = 200;` 

=> 성공적으로 데이터를 전송했음을 응답 상태 코드를 통해 알려준다.

`response.setHeader('Content-Type', 'text/plain');` 

=> setHeader를 통해 응답이 평문 텍스트임을 알려준다.

`response.write('this is my first response.\n');`

=> 보낼 텍스트를 기입한다.

`response.end('Hello, World!');`

 => end 메소드는 write함과 동시에 response를 종료한다.

### 응답을 보고 기뻐하자!

서버를 실행하고 http://localhost:3000로 접속(**요청**)하면 다음 텍스트가 출력되었음 을(**응답**)을 볼 수 있다.

> this is my first response. Hello, World!



## 동기적 실행과 비동기적 실행

노드는 대부분의 메소드를 비동기 방식으로 처리한다.
특히 fs 모듈이 그러한 메소드를 많이 가지고 있다. 

아래와 같이 syntax/sync.js 란 파일을 만들어 `readFileSync`, `readFile` 를 각각 실행해 보았다.

`readFile`은 콜백을 사용한다.

``` javascript
// syntax/sync.js

const fs = require('fs');

// readFileSync

console.group('readFileSync')
console.log('A')
const result = fs.readFileSync('./syntax/sample.txt', 'utf-8')
console.log(result)
console.log('C')
console.groupEnd()


// readFile

console.group('readFile')
console.log('A')
fs.readFile('./syntax/sample.txt', 'utf-8', (error, result) => {
  console.log(result)
})
console.log('C')

/*
readFileSync
  A
  B
  C
readFile
  A
  C
  B
*/
``` 

이를 통해 다음의 사실을 알 수 있다.

* readFileSync는 파일을 읽어오는것을 기다렸다가 실행된다.
* readFile은 파일이 읽어오는것을 기다리지 않고 다음 명령줄이 실행되며, 파일을 읽어온 후에 콜백을 실행한다.

`readFileSync` 메소드를 사용하면 요청이 수백 개 이상 들어오게 된다면 성능이 문제가 생길것이다. `Sync` 메소드를 사용할 때는 이전 작업이 완료되어야 다음 작업을 진행할 수 있기때문에 처리를 기다리는동안 아무것도 못하고 있을 것이다.

보통의 경우 비동기 방식이 효율적이며 비동기 메소드를 사용하는것이 바람직하다.


## PM2

pm2는 프로세스의 오류가 발생하거나 하였을때 자동으로 실행시켜주는 등 역할을 한다.

### Install

```
sudo npm install pm2 -g
```

### start

main.js가 실행된다.

```
pm2 start main.js
```

### 모니터링

실행상태를 모니터링 한다. 재미있는게 강제로 외부에서 main.js의 프로세스를 kill하면 바로 다시 실행시켜준다.

```
pm2 monit
```

### stop

실행을 중단한다.

```
pm2 stop main.js
```

### watch

위와 같이 실행시 --watch 명령을 내리면 pm2가 수정과 동시에 서버를 재실행해준다.

```
pm2 start main.js --watch
```

### 로그 표시하기

실행중인 프로세스의 로그를 표시한다.

```
pm2 log
```

## CRUD

### Create - POST 방식으로 글 작성하기

### Form 생성

`/create` 란 경로를 하나 할당하여 제목, 내용을 받는 form을 create에 삽입하였다.

``` javascript
else if (pathname === '/create') {
  fs.readdir(`${__dirname}/data`, (error, filelist) => {
    title = 'WEB - create';
    const list = template.List(filelist);
    const form = `
      <form action="http://localhost:3000/create_process" method="POST">
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
    const output = template.HTML(title, list, `<h2>${title}</h2>${form}`);

    response.writeHead(200);
    response.end(output);
  });
}
```

create_process란 path로 요청(request)가 전송된다. 이 요청을 받아서 처리해주자.

### create_process 받아서 표시해보기

else-if 로 `create_process` 일 경우를 만든 후 해당 요청에서 들어온 쿼리를 분석해야 할 것이다. 이를 위해 쿼리스트링 모듈을 사용하기 위해 최상단에 모듈을 상수로 선언한다.

``` javascript
const qs = require('querystring')
```

그 후 쿼리를 해석하여 title과 description 데이터를 로그로 표시해보자.
form에 title 부분에는 'this is title', description 부분에는 'this is description' 을 적어 제출했다.

``` javascript
else if ( pathname === '/create_process' ) {
  let body = '';
  request.on('data', (data) => {
    body = body + data
  });
  request.on('end', () => {
    const post = qs.parse(body);
    const title = post.title;
    const description = post.description;

    console.log('title : ',title)
    console.log('description : ',description)
  });
  response.writeHead(200);
  response.end('success');
}

/*
title : this is title
description : this is description
*/
```

form을 통해 받은 title과 description 정보를 얻는데에 성공하였다.

### 파일 생성하기

fs모듈에서 제공하는 `writeFile` 메서드를 이용하여 다음과 같이 파일이 생성되도록 처리하여보자.

``` javascript
else if ( pathname === '/create_process' ) {
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
      response.end('success');
    })
  });
}
```

그후 폼을 submit 해 보면 data 디렉토리에 title에 적힌값을 파일명으로 하여 파일이 생성되는것을 볼 수 있다.

또한 302 리다이렉션을 통해 자신이 적은 글로 이동시켜준다.

### Update 구현

### Delete 구현