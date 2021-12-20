import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : { type : String, required : true, trim : true, maxLength : 80},
        // title의 데이터 타입을 문자열로
    description : { type : String, required : true, trim : true, minLength : 20, maxLength : 140},
    createdAt : { type : Date, required : true, default: Date.now },
        // date의 경우 따로 input 태그 안에 required를 적을 수 없으므로 model에 required 작성
        // createdAt을 Default value 로
    hashtags : [{ type : String, trim : true, }],
        // hashtags를 배열의 형태로 쓰기위해
    meta : {
        views : { type : Number, default : 0, required : true },
        // views의 데이터 타입을 숫자로
        rating : { type : Number, default : 0, required : true },
        // rating의 데이터 타입을 숫자로
    },
    // mongoose에게 data type을 구체적으로 작성할수록 더 편리함
});
// video 모델의 형태 정립

const Video = mongoose.model("Video", videoSchema);

export default Video;

// 모델 생성
//mongoose.model(name : schema)

// model을 생성하기 전에 model의 생김새를 정의해줘야함
// schema : model의 생김새를 정의하는 것