import express from "express";
import { 
    all } 
    from "express/lib/application";
import {
    logout, 
    startGithubLogin, 
    finishGithubLogin, 
    getEdit, 
    postEdit, 
    see,
    getChanagePassword,
    postChanagePassword } 
    from "../controllers/userController";
import { 
    protectorMiddleware, 
    publicOnlyMiddleware,
    uploadFiles } 
    from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/edit")
.all(protectorMiddleware)
// all() => get, post등 어떤 http method를 사용하든지 이 middleware를 사용하겠다
.get(getEdit)
.post(uploadFiles.single("avatar"), postEdit);
// template의 input에서 오는 avatar 파일을 가지고 파일을 업로드하고 uploads폴더에 파일 저장, 그리고 다음 controller에 정보 전달
// req.file 사용 가능하게 해줌
userRouter.route("/change-password")
.all(protectorMiddleware)
.get(getChanagePassword)
.post(postChanagePassword);
userRouter.get("/:id", see);

export default userRouter;