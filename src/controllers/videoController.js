import Video from "../models/video";

export const home = async (req, res) => {
    // promise
    try {
        //try는 실행하고 error가 있으면 catch
        const videos = await Video.find({});
        // await를 find앞에 적으면 find는 callback을 필요로 하지 않는다는 것을 알게 된다.
        // await가 database를 기다려준다.
        // database에서 data를 가져오면 아래 작업들 수행
        // 코드 규칙상 await는 function안에서만 사용 가능하고 해당 function이 asynchronous일 때만 가능하다.
        return res.render("home", {
            pageTitle : "HOME", 
            videos :videos,
        });
        // return을 적어서 return 뒤에 redirect를 적어서 오류를 모르는 실수 방지
    } catch(error) {
        // error를 catch
        // 연결이 끊기거나, 서버 포화상태이거나 할 때
        return res.render("Server Error", {error});
    }
    /*
    // callback
    Video.find({}, (error, videos) => {
        return res.render("home", { pageTitle: "HOME", videos });
    });
    // 중괄호는 Search terms를 나타내고 여기가 비어있으면 모든 형식을 찾는다는 것을 의미
    // Database는 JavaScript 밖에 존재해서 데이터 처리에 시간이 걸리고, 그 시간을 기다려야함
    // callback은 err와 docs라는 signature를 가진다.
    // database 검색이 안 끝났을 때 render 되는 걸 방지하기 위함이다.
    // callback : 특정 코드를 마지막에 실행되게 한다.
    // 정리 : database는 javascript 외에 존재하기 때문에 불러오는데 시간이 걸린다. find 함수는 database에서 date를 찾는 함수이고, 이 함수 아래에 페이지를 render하게 되면, 페이지가 보여지고 데이터를 불러오는데 시간이 걸리기때문에, 데이터를 먼저 불러오고 렌더가 되게끔 순서를 바꾼다.
    // callback의 장점은 error를 추가적인 코드없이 바로 볼 수 있다.
    */

    // 이미 render한것은 다시 render할 수 없음
}; 
    
// HTML에 변수 전달
export const watch = async (req, res) => {
    const { id } = req.params;
    // req.params는 router가 주는 express의 기능
    const video = await Video.findById(id);
    // findById는 id로 영상을 찾을 수 있게 지원해준다.
    if (!video) {
        // 비디오가 없다면
        return res.render("404", {
            pageTitle : "Video not found.",
        });
        // Error check first
        // return 하지않으면 위 코드를 실행하고 아래 코드도 실행하게 됨
        // 비디오를 찾을 수 없음
    } else {
        // 비디오가 있다면
        return res.render("watch", {
            pageTitle: video.title,
            video
        });
        // 비디오 출력
    };
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", {
            pageTitle : "Video not found.",
        });
    } else {
        return res.render("edit", {
            pageTitle : `Edit ${video.title}`,
            video
        });
        // pug 파일에 변수를 전달해주기 위해서 꼭 video를 정의해줘야함
    }
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id : id});
    // exists는 id 전체를 받지않고 filter를 받는다.
    if (!video) {
        return res.render("404", {
            pageTitle : "Video not found.",
        });
    }
    await Video.findByIdAndUpdate(id, {
        // model에 적용시킬수 있는 함수, 첫번째 인자에는 id, 두번째 인자에는 업데이트할 정보
        title, 
        description, 
        hashtags : Video.formatHashtags(hashtags),
    });

    return res.redirect(`/videos/${id}`);
    // res.redirect(url) : 브라우저가 redirect(자동으로 이동)하도록 하는 것
    // 전 페이지로 이동하게 해줌
    // express.urlencoded : form의 body를 이해할 수 있게 하는 express method
    // extended
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};

export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    // /video/upload 경로 body안에 있는 form의 형식을 읽어줌
        try {
            await Video.create({
            title, // = title
            description, // description
            hashtags : Video.formatHashtags(hashtags),
            // mongoose가 고유 id도 부여해줌
            });
            // promise를 return
            return res.redirect("/");
        } catch(error) {
            console.log(error);
            return res.render("upload", {
                pageTitle : "Upload Video",
                errorMessage : error._message,
            });
        }
        // 홈으로 돌아가기}
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    // remove와 delete가 있지만 무조건 delete사용
    console.log(id);
    return res.redirect("/");
}


/*
pug
- returning HTML
*/