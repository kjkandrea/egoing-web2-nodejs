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

