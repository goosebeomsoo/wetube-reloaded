// 오래된 JavaScript Version만 인식을함
// entry -> 우리가 처리하고자하는 파일
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css를 추출해서 별도의 파일로 만들어줌
const path = require("path");
// path.resolve는 입력하는 파트들을 모아서 경로로 만들어줌.
console.log(path.resolve(__dirname, "assets","js"));
// __dirname : 파일까지의 전체경로

const BASE_JS = "./src/client/js/"

module.exports = {
    entry : {
        main : BASE_JS + "main.js",
        videoPlayer : BASE_JS + "videoPlayer.js",
        recorder : BASE_JS + "recorder.js",
        commentSection : BASE_JS + "commentSection.js",
    },
    plugins : [new MiniCssExtractPlugin({ 
        filename : "css/styles.css", 
    })],
    mode : "development", // 개발중 모드 설정
    output : {
        filename : "js/[name].js", // [name]이라고 적어두면 entry에 있는 이름을 가져감
        path : path.resolve(__dirname, "assets"), // absolute path로 적어야함 : 처음부터 끝까지의 경로로
        clean : true,
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : [["@babel/preset-env", {targets : "defaults"}]],
                    },
                },
            },
            {
                test : /\.scss$/,
                use : [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                // sass-loader는 scss를 css로 변환시키는 역할
                // style-loader는 css를 브라우저에 적용시키는 역할
            }
        ],
    },
     // 우리가 처리하고자하는 파일
}