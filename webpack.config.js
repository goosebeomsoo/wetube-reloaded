// 오래된 JavaScript Version만 인식을함
// entry -> 우리가 처리하고자하는 파일
console.log(typeof __dirname);
// __dirname : 파일까지의 전체경로
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css를 추출해서 별도의 파일로 만들어줌
const path = require("path");
// path.resolve는 입력하는 파트들을 모아서 경로로 만들어줌.
console.log(path.resolve(__dirname, "assets","js"));
module.exports = {
    entry : "./src/client/js/main.js",
    plugins : [new MiniCssExtractPlugin({ 
        filename : "css/styles.css" 
    })],
    mode : "development",
    output : {
        filename : "js/main.js",
        path : path.resolve(__dirname, "assets"),
        // absolute path로 적어야함 : 처음부터 끝까지의 경로로
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