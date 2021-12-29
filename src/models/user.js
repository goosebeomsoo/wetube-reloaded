import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // user schema 생성
    email : { type : String, required : true, unique : true },
    avatarUrl : {type : String },
    socialOnly : {type : Boolean, default: false },
    username : { type : String, required : true, unique : true },
    // 같은 username과 email을 가진 계정이 존재하면 안되기때문에 unique : true를 적용해줌
    password : { type : String },
    name : { type : String, requried : true },
    loation : String,
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
    // bcrypt.hash(해시할 패스워드, saltRounds(해시 횟수))
    // userSchema를 저장하기 전에 user가 입력한 패스워드를 해시화 시킬 수 있도록 middleware 생성
})

const User = mongoose.model("User", userSchema);
// userSchema를 User변수에 schma model로 정의

export default User;
// User datamodel 내보내기