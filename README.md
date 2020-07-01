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