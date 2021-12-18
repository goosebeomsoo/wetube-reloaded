import req from "express/lib/request";

let videos = [
    {
        title : "First Video",
        rating : 5,
        comments : 2,
        createdAt : "2 minuates ago",
        views : 59,
        id : 1,
    },
    {
        title : "Second Video",
        rating : 5,
        comments : 2,
        createdAt : "2 minuates ago",
        views : 1,
        id : 2,
    },
    {
        title : "Third Video",
        rating : 5,
        comments : 2,
        createdAt : "2 minuates ago",
        views : 59,
        id : 3,
    },
];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "HOME", videos })
};
    
// HTML에 변수 전달
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("watch", {pageTitle: `Watching : ${video.title}`, video });
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", {pageTitle : `Editing : ${video.title}`, video});
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
    // res.redirect(url) : 브라우저가 redirect(자동으로 이동)하도록 하는 것
    // 전 페이지로 이동하게 해줌
    // express.urlencoded : form의 body를 이해할 수 있게 하는 express method
    // extended
}


/*
pug
- returning HTML
*/