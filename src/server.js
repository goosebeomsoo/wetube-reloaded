import express from "express";
// Web Framework for Node.js
import morgan from "morgan";
// logger middleware function
import session from "express-session";
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

app.use(session({
    secret : "Hello!",
    resave : true,
    saveUninitialized : true,
}));
// Router앞에 초기화
// secret이라는 설정 필요
// 사이트로 들어오는 모두를 기억하게해줌 - 로그인하지 않아도 기억함
// session과 session id는 브라우저를 기억하는 방법중 하나
// Server가 브라우저에게 session id르 주고 있음 브라우저가 서버에 요청할 때마다 쿠키에서 세션 id를 가져와 보내주고 있음, 서버는 session id를 읽고 어떤 브라우저인지 알 수 있음

app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`);
})


app.use("/", rootRouter);
// url "/"에 globalRouter 함수 적용
app.use("/videos", videoRouter);
// url "/videos"에 videoRouter 함수 적용
app.use("/users", userRouter);
// url "/users"에 userRouter 함수 적용


export default app;
// server.js를 app으로 내보내기