import express from "express";
import { 
    startGithubLogin, 
    finishGithubLogin, 
    getEdit, 
    postEdit, 
    see } 
    from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/:id", see);

export default userRouter;