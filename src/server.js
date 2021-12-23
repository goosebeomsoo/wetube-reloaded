import express from "express";
// Web Framework for Node.js
import morgan from "morgan";
// logger middleware function
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const app = express();
// setting variable for express

const logger = morgan("dev");
// Setting variable for morgan

/*
set(name, value) : Assin setting A to B, You want store any value that you want, but certain names can be used to configure the behavior of the server. These special names are listed in the app settings table.

값에 설정 이름 할당, 원하는 만큼의 어떠한 값이든 저장한다. 하지만 정확한 이름들은 서버의 행동  구성에 사용될 수 있다. 이러한 특별한 이름들안 app setting table에 기록된다.
*/

app.set("view engine", "pug");
// setting pug to view engine

app.set("views", process.cwd() + "/src/views");
// pug 작업 경로를 wetube/views가 아니라, wetube/src/views로 변경
// views : A directory or an array of directories for the application's views. if an array, the views are looked up in the order they occur in the array. => 어플리케이션 의 views를 위한 폴더또는 배열의 폴더 / process.cwd() + "/views"
// -> pug를 view엔진으로 설정하고 views의 작업 경로를 현재 작업 경로에 src/view를 더하기

app.use(logger);
// morgan을 middleware로 설정

app.use(express.urlencoded({extended : true}));
// express application이 form의 value를 이해할 수 있도록 하고 우리가 사용할 수 있는 자바스크립트 형식으로 변형
// middleware

app.use("/", rootRouter);
// url "/"에 globalRouter 함수 적용
app.use("/videos", videoRouter);
// url "/videos"에 videoRouter 함수 적용
app.use("/users", userRouter);
// url "/users"에 userRouter 함수 적용


export default app;
// server.js를 app으로 내보내기