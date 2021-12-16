import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
// pug를 view engine으로 설정
app.set("views", process.cwd() + "/src/views");
// 작업 경로를 wetube/views가 아니라, wetube/src/views로 변경
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);