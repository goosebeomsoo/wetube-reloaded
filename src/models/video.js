import mongoose from "mongoose";
// mongoose 불러오기

const videoSchema = new mongoose.Schema({
    title : { type : String, required : true, trim : true, maxLength : 80},
    fileUrl : { type : String, required : true },
    thumbUrl : { type : String, required : true },
    description : { type : String, required : true, trim : true, minLength : 2 }, 
    createdAt : { type : Date, required : true, default : Date.now },
    hashtags : [{ type : String, trim : true, }],
    meta : {
        views : { type : Number, default : 0, required : true },
        rating : { type : Number, default : 0, required : true },
    },
    comments : [{type : mongoose.Schema.Types.ObjectId, required : true, ref : "Comment"}],
    owner : { type : mongoose.Schema.Types.ObjectId, required : true, ref : "User"},
    // ObjectId는 javascript에서 제공하지 않고 mongoose에서 제공
    // mongoose에게 data type을 구체적으로 작성할수록 더 편리함
    // 많은 비디오들을 담을 수 있으니 배열로 구성
});
// video 모델의 형태 정립

videoSchema.static("formatHashtags", (hashtags) => {
    // Schema.static(String | Object, Function) => Schema model에 method 더하기
    return hashtags
    .split(",")
    .map(word => word.startsWith("#") ? word : `#${word}`);
    // String.split() => split() 메서드는 String 객체를 지정한 구분자를 이용하여 여러개의 문자열을 나누고 배열 형태로 반환.
    // Array.map() => map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
    // str.statswith(searchString) => 문자열이 searchString으로 시작하면 true, 아니멸 false
});

/*
videoSchema.pre("save", async function() {
    this.hashtags = this.hashtags[0]
    .split(",")
    .map(word => word.startsWith("#") ? word : `#${word}`);
    // this는 저장하고자하는 문서를 가리킴 -> 현재 업로드하려고하는 비디오를 가리킴
    // videoSchema를 저장하기 전에 hashtags작업
});
// mongoose middleware는 무조건 model이 생성되기 전에 만들어야한다.
*/

const Video = mongoose.model("Video", videoSchema);


export default Video;

// 모델 생성
//mongoose.model(name : schema)

// model을 생성하기 전에 model의 생김새를 정의해줘야함
// schema : model의 생김새를 정의하는 것