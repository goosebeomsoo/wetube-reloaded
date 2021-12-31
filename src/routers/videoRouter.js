import express from "express";
import { all } from "express/lib/application";
import { 
    watch, 
    getEdit, 
    postEdit,
    getUpload, 
    postUpload,
    deleteVideo } 
    from "../controllers/videoController"
import { 
    protectorMiddleware } 
    from "../middleware";

const videoRouter = express.Router();
// 변수를 Router로 적용

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);
// videoController에서 getUpload와 postUpload 불러오기
// 같은 url안에서 GET과 POST로 축약

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

hexadecimal
- 0-9, a-f 까지의 문자들로 이루어진 24개의 
*/