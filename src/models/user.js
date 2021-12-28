import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
})

const User = mongoose.model("User", userSchema);
export default User;