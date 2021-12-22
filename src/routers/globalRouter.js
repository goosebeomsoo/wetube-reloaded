import express from "express";

import { join, login } from "../controllers/userController"
import { home, search } from "../controllers/videoController"

const globalRouter = express.Router();

globalRouter.get("/", home);
// url "/"에 trending 함수 적용
globalRouter.get("/join", join);
// url "/join"에 join 함수 적용
globalRouter.get("/login", login);
// url "/login"에 login 함수 적용
globalRouter.get("/search", search);

export default globalRouter
// globalRouer default로 export => import하는 파일에서 globalRouter의 변수값을 아무렇게나 변경해도 상관없음