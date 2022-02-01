import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    // promise
    try {
        //try는 실행하고 error가 있으면 catch
        const videos = await Video.find({}).sort({createdAt : "desc"}).populate("owner");
        // video database에서 전체 데이터를 찾고 작성순으로 정렬
        // sort()로 순서 정렬
        // await를 find앞에 적으면 find는 callback을 필요로 하지 않는다는 것을 알게 된다.
        // await가 database를 기다려준다.
        // database에서 data를 가져오면 아래 작업들 수행
        // 코드 규칙상 await는 function안에서만 사용 가능하고 해당 function이 asynchronous일 때만 가능하다.

        return res.render("home", {
            pageTitle : "HOME", 
            videos,
        });

        // return을 적어서 return 뒤에 redirect를 적어서 오류를 모르는 실수 방지
    } catch(error) {
        // error를 catch
        // 연결이 끊기거나, 서버 포화상태이거나 할 때
        return res.status(400).render("home", {pageTitle : "Error"});
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
    // 비디오 창으로 이동
    const { id } = req.params;
    // req.params는 router가 주는 express의 기능
    // express가 임의로 부여한 id를 변수로 지정
    const video = await Video.findById(id).populate("owner").populate("comments");
    // const owner = await User.findById(video.owner);
    // populate가 owner의 부분을 user의 정보로 채워줌
    console.log(video);
    if (!video) {
        // dababase에 저장된 video data의 id 값이 일치하지않다면
        return res.status(404).render("404", {
            pageTitle : "Video not found.",
        });
        // Error check first
        // return 하지않으면 위 코드를 실행하고 아래 코드도 실행하게 됨
        // 비디오를 찾을 수 없음
    } else {
        // 비디오가 있다면
        return res.render("watch", {
            pageTitle: video.title,
            video,
            // owner,
        });
        // 비디오 출력
    };
}

export const getEdit = async (req, res) => {
    // /:id([0-9a-f]{24})/edit 경로에 비디오 수정 페이지 출력
    const {
        params : {
            id,
        },
        session : {
            user : {
                _id,
            }
        }
    } = req;
    // 요청된 url에 임의로 부여된 id값을 변수에 저장
    const video = await Video.findById(id);
    // id값으로 데이터 정보 찾기

    console.log(typeof video.owner, typeof _id)
    if (!video) {
        // id값이 일치하지 않다면
        return res.status(404).render("404", {
            pageTitle : "Video not found.",
        });
    } else {
        if (String(video.owner) !== String(_id)) {
            return res.status(403).redirect("/");
        }
        return res.render("edit", {
            pageTitle : `Edit ${video.title}`,
            video
        });
        // pug 파일에 변수를 전달해주기 위해서 꼭 video를 정의해줘야함
    }
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    // 임의로 부여된 id 변수 저장
    const {title, description, hashtags} = req.body;
    // Video update form에서 title, description, hashtags의 내용을 가져옴
    const video = await Video.exists({_id : id});
    // videos database의 _id값과 부여된 id가 일치하여 true인 boolean을 video 변수에 저장
    // exists는 id 전체를 받지않고 filter를 받는다.
    if (!video) {
        return res.status(404).render("404", {
            pageTitle : "Video not found.",
        });
    }
    await Video.findByIdAndUpdate(id, {
        // Model.findByIdAndUpdate({_id : id}) => database의 id값과 같은 id값을 찾고 정보를 수정한다.
        // model에 적용시킬수 있는 함수, 첫번째 인자에는 id, 두번째 인자에는 업데이트할 정보
        title, // title의 정보를 form에 입력한 title의 정보로 업데이트
        description,  // description 정보를 form에 입력한 description의 정보로 업데이트
        hashtags : Video.formatHashtags(hashtags),
        // == hashtags : hashtags.split(",").map(word) => word.startsWith("#") ? word : `#${word}`
        // hashtags의 정보를 Vide에 입력한 title의 정보로 업데이트
    });

    return res.redirect(`/videos/${id}`);
    // res.redirect(url) : 브라우저가 redirect(자동으로 이동)하도록 하는 것
    // 전 페이지로 이동하게 해줌
    // express.urlencoded : form의 body를 이해할 수 있게 하는 express method
    // extended
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
    // upload 페이지 렌더링
};

export const postUpload = async (req, res) => {
    const {
        session : {
                user : { _id }
        },
        body : {
            title, 
            description, 
            hashtags
        },
        files : {
            video,
            thumb
        }
    } = req;

    try {
        const newVideo = await Video.create({
            // mongoose가 고유 id도 부여
            title,
            description,
            fileUrl : video[0].path,
            thumbUrl : thumb[0].path,
            owner : _id,
            hashtags : Video.formatHashtags(hashtags),
        });
        
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect(`/`);
    } catch(error) {
        console.log(error);
        return res.status(400).render("upload", {
            pageTitle : "Upload Video",
            errorMessage : error._message,
        });
    };
};

export const deleteVideo = async (req, res) => {
    const {
        params : {
            id,
        },
        session : {
            user : {
                _id,
            }
        }
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", {
            pageTitle : "Video not found.",
        });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    // remove와 delete가 있지만 무조건 delete사용
    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    // search form에서 입력되는 문자열 불러오기
    let videos = [];
    // videos 변수에 빈 배열 선언
    if (keyword) {
        videos = await Video.find({
            title : {
                $regex : new RegExp(keyword, "i")
            },
        }).populate("owner");
    }
    console.log(videos);
    return res.render("search", {pageTitle : "Search", videos});
}
/* 
pug
- returning HTMLß
*/

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
    // status는 render하기 전에 상태코드를 정할 수 있는 것
    // sendStatus는 상태코드를 보내고 연결을 끊는 것
}

export const createComment = async (req,res) => {
    const {
        session : { user },
        body : { text },
        params : { id },
    } = req;
    
    const video = await Video.findById(id);
    if(!video) {
        return res.sendStatus(404);
    }

    const comment = await Comment.create({
        text,
        owner : user._id,
        video : id,
    })
    video.comments.push(comment._id);
    video.save();
    return res.status(201).json({newCommentId : comment._id});
}

export const deleteComment = async (req,res) => {
    const {id} = req.params
    await Comment.findByIdAndDelete(id);
    res.sendStatus(201);
}