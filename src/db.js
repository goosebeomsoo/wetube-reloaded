import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");
// url뒤에 db이름 입력

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected DB");
const handleError = () => console.log("❌DB error", error);

db.on("error", handleError);
db.once("open", handleOpen);