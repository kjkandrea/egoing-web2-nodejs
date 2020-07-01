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