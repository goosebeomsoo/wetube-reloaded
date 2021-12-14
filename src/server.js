// express 구동방법
// const express = require("express");
//const app = express();
import express from "express";

const PORT = 4000;

const app = express(); // express functions은 express application을 생성

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

//node js download
//local repo -> mkdir
//github -> make repo
//repo -> git init 
//git remote add origin [github address]
//npm init

/*
cannot GET /
GET -> HTTP method
/ -> google.com/
http : 서버끼리 소통하는 방법
http request : 웹사이트에 접속하고 서버에 정보를 보내는 방법 


npm

- npm은 아주 똑똑해서 npm이 package.json을 보고 dependencies를 찾아서 그 안에 있는 모듈들을 알아서 설치
- package.json은 프로젝트를 동작시킬때 필요한 모듈들이 어떤건지 정보를 담고 있음
- 팀으로 nodejs 프로젝트를 진행하거나 컴퓨터를 바꿀때 node_modules를 깃허브에 업로드할 필요가 없음 (너무 무거움)
- node_modules에서 설치해야할 모든 모듈을 알려줌. (npm install 로 간단하게 설치할 수 있음)
- npm설치때 package.json이 열려있고 수정을 했는데 저장을 하지않은 상태면 충돌이 일어남 (저장을 하지 않아서)
    -> 꼭 package.json 닫고 설치



Package-lock.json

- 패키지들을 안전하게 관리해줌
- 수정사항을 해시값으로 체크해줌
- package.json, package-lock.json, index.js를 npm i 하면 똑같은 버전의 모듈 설치 가능



.gitignore

/node_modules -> 이 파일을 빼고 업로드


Babel

- 자바스크립트 컴파일러
- nodeJS가 인식하지 못 할수도 있는 최신 자바스크립트를 컴파일(변환) 해준다.
- 모두가 이해할 수 있는 Javascript로 변환 
- 바벨탑은 모두가 다른 언어로 이야기하던 곳


devDependencies

- 개발자에게 필요한 dependencies(프로젝트에 필요한 것)
- 운전을 잘하려면 음악이 필요한 느낌
- node_modules에 설치됨
- --save-dev : devDependencies에 저장
- babel.donfig.json : 알아서 파일을 찾고 봄
- preset은 babel을 위한 엄청 거대한 플러그인 (smart preset 최신 자바스크립트 구문을 사용하게 해줌)


nodemon
- 우리가 만든 파일이 수정되는걸 감시해주는 패키지
- 파일이 수정되면 nodemon이 재시작해줌

request
- 서버에 메세지를 보내면 나에게 응답을 보내는 것
- 서버와 상호작용하는 것

callback
*/