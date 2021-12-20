import Video from "../models/video";

export const home = (req, res) => {
    Video.find({}, (error, videos) => {
        console.log("errors", error);
        console.log("videos", videos);
    });
    // callback
    return res.render("home", { pageTitle: "HOME", videos : [] });
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