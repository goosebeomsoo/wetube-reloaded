// 오래된 JavaScript Version만 인식을함
// entry -> 우리가 처리하고자하는 파일
console.log(typeof __dirname);
// __dirname : 파일까지의 전체경로
const path = require("path");
// path.resolve는 입력하는 파트들을 모아서 경로로 만들어줌.
console.log(path.resolve(__dirname, "assets","js"));
module.exports = {
    entry : "./src/client/js/main.js",
    mode : "development",
    output : {
        filename : "main.js",
        path : path.resolve(__dirname, "assets","js"),
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
                use : ["style-loader", "css-loader", "sass-loader"],
            }
        ],
    },
     // 우리가 처리하고자하는 파일
}