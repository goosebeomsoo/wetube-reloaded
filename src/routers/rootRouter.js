import express from "express";

import { getJoin, postJoin, getLogin, postLogin, logout } from "../controllers/userController"
import { home, search } from "../controllers/videoController"

const rootRouter = express.Router();


rootRouter.get("/", home);
// url "/"에 home 함수 적용
rootRouter.route("/join").get(getJoin).post(postJoin);
// url "/join"에 join 함수 적용
rootRouter.route("/login").get(getLogin).post(postLogin);
// url "/login"에 login 함수 적용
rootRouter.get("/logout", logout);

rootRouter.get("/search", search);


export default rootRouter
// globalRouer default로 export => import하는 파일에서 rootRouter의 변수값을 아무렇게나 변경해도 상관없음