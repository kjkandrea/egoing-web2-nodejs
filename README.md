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
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
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
내가 읽고 싶은 정보는 HTML이고(id=HTML) 12페이지(page=12) 이다.

* 쿼리스트링의 시작은 물음표(?)
* 값과 값 사이에는 amp(&)
* 값과 값 사이는 equal(=)