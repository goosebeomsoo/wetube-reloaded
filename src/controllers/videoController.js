import Video from "../models/video";

export const home = (req, res) => {
    Video.find({}, (error, videos) => {
        // 중괄호는 Search terms를 나타내고 여기가 비어있으면 모든 형식을 찾는다는 것을 의미
        // Database는 JavaScript 밖에 존재해서 데이터 처리에 시간이 걸리고, 그 시간을 기다려야함
        // callback은 err와 docs라는 signature를 가진다.
        
        return res.render("home", { pageTitle: "HOME", videos });
        // database 검색이 안 끝났을 때 render 되는 걸 방지하기 위함이다.
        // callback : 특정 코드를 마지막에 실행되게 한다.
        // 정리 : database는 javascript 외에 존재하기 때문에 불러오는데 시간이 걸린다. find 함수는 database에서 date를 찾는 함수이고, 이 함수 아래에 페이지를 render하게 되면, 페이지가 보여지고 데이터를 불러오는데 시간이 걸리기때문에, 데이터를 먼저 불러오고 렌더가 되게끔 순서를 바꾼다.
    });
}; 
    
// HTML에 변수 전달
export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", {pageTitle: `Watching`});
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", {pageTitle : `Editing`});
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
    // res.redirect(url) : 브라우저가 redirect(자동으로 이동)하도록 하는 것
    // 전 페이지로 이동하게 해줌
    // express.urlencoded : form의 body를 이해할 수 있게 하는 express method
    // extended
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};

export const postUpload = (req, res) => {
    const {title} = req.body;
    return res.redirect("/");
};


/*
pug
- returning HTML
*/