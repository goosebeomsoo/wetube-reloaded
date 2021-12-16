export const trending = (req, res) => {
    const videos = [
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
            views : 59,
            id : 1,
        },
        {
            title : "Third Video",
            rating : 5,
            comments : 2,
            createdAt : "2 minuates ago",
            views : 59,
            id : 1,
        },
    ];
    return res.render("home", { pageTitle: "HOME", videos })
};
    
// HTML에 변수 전달
export const see = (req, res) => res.render("watch", {pageTitle: "WATCH"});
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) =>{
    return res.send("deleteVideo");
}

/*
pug
- returning HTML
*/