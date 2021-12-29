import "dotenv/config";
// env 파일 불러오기 => 프로젝트 제일 앞 부분에 정의해주어야 함
import "./db";
// db.js File 불러오기
import "./models/video";
// models folder에 video.js 불러오기
import "./models/user";
// models folder에 user.js 불러오기
import app from "./server";
// app변스로 server.js파일 불러오기

const PORT = 4000;
// PORT value setting

const handleListening = () => console.log(`✅Server listening on port http://localhost:${PORT}`);
// console에 서버가 연결되었다는 로깅

app.listen(PORT, handleListening);
// 4000번 포트에서 server.js 내용을 response