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
    publicOnlyMiddleware } 
    from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
// all() => get, post등 어떤 http method를 사용하든지 이 middleware를 사용하겠다
userRouter.route("/change-password").all(protectorMiddleware).get(getChanagePassword).post(postChanagePassword);
userRouter.get("/:id", see);

export default userRouter;