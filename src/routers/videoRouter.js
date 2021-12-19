import express from "express";
import { 
    watch, 
    getEdit, 
    postEdit,
    getUpload, 
    postUpload} 
    from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
//같은 url안에서 GET과 POST로 축약

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