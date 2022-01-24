import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : { type : String, required : true, unique : true },
    avatarUrl : {type : String },
    socialOnly : {type : Boolean, default: false },
    username : { type : String, required : true, unique : true },
    password : { type : String },
    name : { type : String, requried : true },
    location : String,
    comments : [{type : mongoose.Schema.Types.ObjectId, ref : "Comment"}],
    videos : [{type : mongoose.Schema.Types.ObjectId, ref : "Video"}],
});

userSchema.pre("save", async function() {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
    // bcrypt.hash(해시할 패스워드, saltRounds(해시 횟수))
    // userSchema를 저장하기 전에 user가 입력한 패스워드를 해시화 시킬 수 있도록 middleware 생성
})

const User = mongoose.model("User", userSchema);
// userSchema를 User변수에 schma model로 정의

export default User;
// User datamodel 내보내기