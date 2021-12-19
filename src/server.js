import "./db";
import express from "express";
// Web Framework for Node.js
import morgan from "morgan";
// logger middleware function
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;
// PORT value setting

const app = express();
// setting variable for express

const logger = morgan("dev");
// Setting variable for morgan

app.set("view engine", "pug");
// setting pug to view engine
app.set("views", process.cwd() + "/src/views");
// pug 작업 경로를 wetube/views가 아니라, wetube/src/views로 변경
app.use(logger);
// middleware
app.use(express.urlencoded({extended : true}));
// express application이 form의 value를 이해할 수 있도록 하고 우리가 사용할 수 있는 자바스크립트 형식으로 변형
// middleware
app.use("/", globalRouter);
// url "/"에 globalRouter 함수 적용
app.use("/videos", videoRouter);
// url "/videos"에 videoRouter 함수 적용
app.use("/users", userRouter);
// url "/users"에 userRouter 함수 적용

const handleListening = () => console.log(`✅Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);