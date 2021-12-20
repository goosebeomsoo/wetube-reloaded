import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : String,
    description : String,
    createdAt : Date,
    hashtags : [{ type : String }],
    meta : {
        views : Number,
        rating : Number,
    },
});
// video 모델의 형태 정립

const Video = mongoose.model("Video", videoSchema);

export default Video;

// 모델 생성
//mongoose.model(name : schema)

// model을 생성하기 전에 model의 생김새를 정의해줘야함
// schema : model의 생김새를 정의하는 것