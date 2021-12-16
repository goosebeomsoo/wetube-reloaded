import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;

/*
parameter (/:[url])
- url안에 변수를 포함시킬 수 있게 해줌
- parameter를 포함한 라우터는 아래로 위치하게

Express Router

Regular Expression(정규식)
- 문자열로부터 특정 정보를 추출해내는 방식
- 모든 프로그래밍 언어에 존재
- (\\d+) : 숫자만 선택하는 정규식
*/