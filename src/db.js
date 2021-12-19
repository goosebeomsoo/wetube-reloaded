import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");
// url뒤에 db이름 입력

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected DB");
// DB가 연결되면 함수 실행
const handleError = () => console.log("❌DB error", error);
// DB가 연결이 되지않으면 함수 실행

db.on("error", handleError);
db.once("open", handleOpen);

/*
CRUD
- Create, Read, Update, Delete
*/