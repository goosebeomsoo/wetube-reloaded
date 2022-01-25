import express from "express";
// Web Framework for Node.js
import morgan from "morgan";
// logger middleware function
import session from "express-session";
// express-session를 session으로 불러오기
import flash from "express-flash";
// express-session를 session으로 불러오기
import MongoStore from "connect-mongo";
// databese(mongodb)에 session을 저장할 수 있게 해줌
import rootRouter from "./routers/rootRouter";
// rooterRouter.js 파일에서 rootRouter 불러오기
import videoRouter from "./routers/videoRouter";
// videoRouter.js 파일에서 videoRouter 불러오기
import userRouter from "./routers/userRouter";
// userRouter.js 파일에서 userRouter 불러오기
import { localsMiddleware } from "./middleware";
// middleware.js 파일에서 localsMiddleware 불러
import apiRouter from "./routers/apiRouter";

const app = express();
// setting variable for express
// express 기본 세팅

const logger = morgan("dev");
// Setting variable for morgan
// morgan으로 logging 기록

/*
set(name, value) : Assin setting A to B, You want store any value that you want, but certain names can be used to configure the behavior of the server. These special names are listed in the app settings table.

값에 설정 이름 할당, 원하는 만큼의 어떠한 값이든 저장한다. 하지만 정확한 이름들은 서버의 행동  구성에 사용될 수 있다. 이러한 특별한 이름들안 app setting table에 기록된다.
*/

app.set("view engine", "pug");
// view engine으로 pug설정

app.set("views", process.cwd() + "/src/views");
// pug 작업 경로를 wetube/views가 아니라, wetube/src/views로 변경
// views : A directory or an array of directories for the application's views. if an array, the views are looked up in the order they occur in the array. => 어플리케이션 의 views를 위한 폴더또는 배열의 폴더 / process.cwd() + "/views"
// -> pug를 view엔진으로 설정하고 views의 작업 경로를 현재 작업 경로에 src/view를 더하기

app.use(logger);
// morgan을 middleware로 사용

app.use(express.urlencoded({extended : true}));
// express application이 form의 value를 이해할 수 있도록 하고 우리가 사용할 수 있는 자바스크립트 형식으로 변형 (req.body를 사용할 수 있게 만들어줌)
// middleware

app.use(express.json());
// string을 받아서 object로 변환해줌

//app.use(express.text());
// text를 보내면 그걸 이해하게 도와주는 middleware

app.use(session({
    secret : process.env.COOKIE_SECRET, // longer, powerful, random
    // cookie에 sign할 때 사용하는 String
    // cookie에 sign하는 이유는 우리 backend가 cookie를 줬다는 것을 보여주기 위함이다.
    resave : false,
    saveUninitialized : false,
    //cookie : { maxAge : 20000, = 20sec },
    // ->Expires : 만료일, 만료날짜를 지정하지 않으면 expires가 sessions cookie로 설정됨
    // session의 초기화, false : session을 수정할 때만 DB에 저장하고 쿠키를 넘겨줌
    store : MongoStore.create({ mongoUrl : process.env.DB_URL }),
    // mongodb url에 session 저장 디렉토리 생성
    // sessions은 원래 server에 저장되고 server를 껏다가 키면 session도 없어지기 때문에 database에 저장해야함
    // 익명 사용자의 session까지 database에 저장해야할 필요는 없음
}));
/*
Cookie component
- domain : cookie를 만든 backend가 누구인지 알려줌. 브라우저는 domain에 따라 cookie를 저장, 또 cookie는 domain에 있는 backend로만 전송됨.

*/

// Router앞에 초기화
// secret이라는 설정 필요
// 사이트로 들어오는 모두를 기억하게해줌 - 로그인하지 않아도 기억함
// session과 session id는 브라우저를 기억하는 방법중 하나
// Server가 브라우저에게 session id르 주고 있음 브라우저가 서버에 요청할 때마다 쿠키에서 세션 id를 가져와 보내주고 있음, 서버는 session id를 읽고 어떤 브라우저인지 알 수 있음
// session middleware가 있으면 express가 알아서 그 브라우저를 위한 id를 만들고, 브라우저한테 보내줌. 그러면 브라우저가 쿠키에 그 session id를 저장하고 express에서도 그 세션을 세션 DB에 저장. 그러면 브라우저한테 보내서 쿠키에 저장한 session id를 브라우저가 localhost:4000의 모든 url에 요청을 보낼 때마다 세션 id를 요청과 함께 보낸다. -> 백엔드에서 어떤 유저가, 어떤 브라우저에서 요청을 보냈는지 알 수 있음
// session store는 우리가 session을 저장하는 곳

app.use(flash());
// session에 연결해서 user에게 message를 남김
app.use(localsMiddleware);
// locals middleware가 session middleware 다음에 와야 session object에 접근할 수 있음
app.use((req,res,next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
app.use("/uploads", express.static("uploads"));
// static file serving 폴더 전체를 브라우저에게 노출 시킴
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
// url "/"에 globalRouter 함수 적용
app.use("/videos", videoRouter);
// url "/videos"에 videoRouter 함수 적용
app.use("/users", userRouter);
// url "/users"에 userRouter 함수 적용
app.use("/api", apiRouter);


export default app;
// server.js를 app으로 내보내기