export const trending = (req, res) => {
    const videos = [];
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