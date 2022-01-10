import User from "../models/user";
import Video from "../models/video";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"});
    // Join page rendering
};

export const postJoin = async (req, res) => {
    console.log(req.body);
    const { name, username, email, password, password2, location } = req.body;
    // join page form안의 내용 object로 변환
    const pageTitle = "Join";
    if (password !== password2) {
        // 입력한 password가 일치하지 않을 경우
        return res.status(400).render("join", {
            // http status를 400으로 보내고 아래 내용을 담은 join페이지 렌더링
            // 상태코드를 브라우저에게 보내주냐 아니냐에 따라 url 히스토리 기록 여부가 결정됨
            pageTitle,
            // pageTitle을 Join으로
            errorMessage : "Password confirmmation does not match",
            // errorMessage를 Password confirmmation does not match로
        });
    };

    const exists = await User.exists({ $or : [
       { username },
       { email },
       // users database에 username또는 email이 있으면 true 
       // exists() => return true if at least one document exists in the database that matches the given filter, and false otherwise
    ] });

    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage : "This username/email is already taken",
        });
        // users database에 username또는 email이 있으면 http status를 400으로 반환하고 join페이지 렌더링
    }

    try {
        // Model.create() => 
        await User.create({
            name, // users database의 name에 form에서 작성된 name 저장
            username, // users database의 username에 form에서 작성된 username 저장
            email, // users database의 email에 form에서 작성된 email 저장
            password, // users database의 password에 form에서 작성된 password 저장
            location,  // users database의 location에 form에서 작성된 locaiton 저장
        });
    } catch(error) {
        console.log(error);
        return res.status(400).render("Join", {
            pageTitle,
            errorMessage : error._message,
        });
    }
    // try/catch를 통해 에러 처리
    
    res.redirect("/login");
    // /Join url에서 form의 정보를 가져옴
    /*
    PASSWORD HASHING
    - 정확한 password가 뭔지 몰라도 체크할 수 있게 만들어줌
    - password를 database에 저장하면 안됨
    - 해싱은 일방향 함수, String
        -> 일방향 함수 : 입력으로 출력값을 알 수 있지만 출력값으로 입력값을 알 수 없음
    - 같은 입력값으로 같은 출력값이 나옴 : deterministic function(결정적 함수)
    - rainbow table 공격을 bcrypt가 박아줌
    */
};

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle : "Log in"});
    // /login으로 접속할 시 login 페이지 렌더링
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    // login form에서 username과 password 가져오기
    const pageTitle = "Login";
    // pagetitle === Login
    const user = await User.findOne({
        // await로 database에서 user의 정보를 기다림
        username, // username은 login form에 입력된 username
        socialOnly : false, // socialOnly는 false로 (social login이 아닌 상태 표시)
    });
    // users database의 username과 login form에 입력된 username이 같은 상태
    // Model.findOne() => 하나의 object를 반환
    if(!user) {
        // users database의 username과 login form에 입력된 username이 같지 않다면
        return res.status(400).render("login", {
            // http 400 반환 하고 login 페이지 렌더링
            pageTitle, 
            errorMessage  : "Account not found"
        });
    };

    const match = await bcrypt.compare(password, user.password);
    // database에 저장된 user의 password가 해시값으로 저장되어있기 때문에 bcrypt 사용
    // form에 입력된 "password"와 form에 입력된 username이 database에 입력된 username과 같으며 socialOnly가 false인 user의 "password"가 true임을 match 변수에 저장
    // bcrypt.compare(inputPassword, databasePassword)
    if(!match) {
        // 입력된 password와 database의 password가 같지않을때
        return res.status(400).render("login", {
            // http 400 반환하고 login 페이지 렌더링
            pageTitle,
            errorMessage : "Wrong password"
        });
    } else {
        // 입력된 password와 database의 passwordrk 같을 때는
        req.session.loggedIn = true;
        // request session의 login상태를 true로 설정.
        req.session.user = user;
        // request session의 user를 login form에 입력한 username과 같고 social login 상태는 false인 유저의 정보로
        return res.redirect("/");
        // 그리고 home으로 돌아감
    }
    // sessions 초기화
    // sessions에 user 정보 저장
}

export const startGithubLogin = (req, res) => {
    // user를 github로 보내서 인증
    const baseUrl = "https://github.com/login/oauth/authorize?";
    // 인증을 위한 url을 baseUrl 변수에 설정
    const config = {
        client_id : process.env.GH_CLIENT,
        // env파일에 저장된 클라이언트 아이디를 불러옴
        allow_signup : false,
        scope : "read:user user:email",
        // 공백으로 scope 구분
    };
    // config 변수에 인증 정보 저장
    const params = new URLSearchParams(config).toString();
    // URLSearchParams는 object를 parameter 변환해줌 (하지만 type은 object)
    // Object.toString()은 object를 String type으로 변환해줌
    // "https://github.com/login/oauth/autherize?client_id=1ca882aeb7b07d6e79a3&allow_signup=false&scope=user%20email"
    // 공백은 %20으로 반환됨
    const finalUrl = `${baseUrl}${params}`;
    // baseUrl에 params 더해서 finalUrl로 변수 저장
    return res.redirect(finalUrl);
    // finalUrl변수로 redirect
}

// 위 에서 보낸 유저가 github에서 Authorization을 누르면 아래 함수가 실행

export const finishGithubLogin = async (req, res) => {
    // 소셜로그인 끝
    const baseUrl = "https://github.com/login/oauth/access_token";
    // baseUrl 변수에 https://github.com/login/oauth/access_token 설정
    const config = {
        client_id : process.env.GH_CLIENT,
        // client id를 env에 저장된 클라이언트 id로 불러옴
        client_secret : process.env.GH_SECRET,
        // client secret을 env에 저장된 클라이언트 secret으로 불러옴
        code : req.query.code,
        // req.query의 code이름
    }
    // config 객체 생성
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const tokenRequest = await (
        await fetch(finalUrl, {
        method : "POST", // GET, POST, PUT, DELETE
        headers : {
            Accept : "application/json",
        },
    })
    ).json();
    
    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        // scope에 명시한 권한만 가져다줌
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers : {
                    Authorization : `token ${access_token}`
                }
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers : {
                    Authorization : `token ${access_token}`
                }
            })
        ).json();
        
        const emailObj = emailData.find(
            email => email.primary === true && email.verified === true
        );

        if (!emailObj) {
            return res.redirect("/login");
        }

        let user = await User.findOne({ email : emailObj.email });
        // database users directory에서 email이 github에 가입한 email과 같은 user를 기준으로 user data 검색.
        if (!user) {
            // users database의 email 정보와 github에 가입된 email 정보가 같지 않으면
            user = await User.create({
                avatarUrl : userData.avatarUrl,
                name : userData.name,
                username : userData.login,
                email : emailObj.email,
                password : "",
                socialOnly : true,
                location : userData.location,
            });
            // user database에 새로 계정 생성
        } else {
            // database에 동일한 email이 존재한다면
            req.session.loggedIn = true;
            // session에 login 상태를 true로
            req.session.user = user;
            // login된 user를 email이 같은 user로
            return res.redirect("/");
            // home으로
        }
        // primary와 verified가 true라면 이메일로 로그인 허용
    } else {
        return res.redirect("/login");
    }
    /*
    fetch()
    -> fetch함수를 사용하면 클라이언트가 직접 HTTP 요청에 응답을 받는게 간편해짐
    첫번째 인자로 url, 두번째 인자로 option object를 받고 Promise 타입의 object 반환
    fetch는 브라우저 상에는 존재하지만 server에는 존재하지않기 때문에 nodejs는 node-fetch라는
    패키지를 설치해야함
    */
    // node-fetch version 3 부터는 ESM-only Module, CSM에서는 version 2로 설치해야함
};

export const logout = (req, res) => {
    req.session.destroy();
    // 연결 종료
    return res.redirect("/login");
};

export const getEdit = (req, res) => {
    // Edit Profile page에 user의 저장 내용 렌더링
    return res.render("users/edit-profile", {pageTitle : "Edit Profile" });
}

export const postEdit = async (req, res) => {
    // user의 정보를 update해주는 함수
    const {
        session : {
            user : { 
                _id, 
                avatarUrl 
            },
        },
        body : {
            name, 
            email, 
            username,
            location,
        }, // == const { email, username, name, location } = req.body;
        file,
    } = req; // == const { id } = req.session.user;
    // edit-profile page form에서 user의 입력된 정보를 변수로 선언, database에 저장된 user의 id를 변수로 선언   
    /*
    req.session.user = {
        ...req.session.user,
        // req.session.user안의 내용을 밖으로 꺼내줌
        name,
        email,
        username,
        location,
    };
    */

   
   // user database에 이미 존재하는 user의 username 값 중 요청한 user의 usename과 일치하면 true
   // 요청하고 있는 user는 user database에서 검색을 포함시키면 안됨
   const existsUsername = await User.exists({
       _id : {$nin : _id},
       username,
      // id값이 다른 user중에서 입력한 username과 같은 사람 찾기
   });

    if (existsUsername) {
        // user database에 이미 존재하는 username이라면
            return res.status(400).render("users/edit-profile", {
                pageTitle : "Edit Profile",
                errorMessage : "Exists Username",
            });
    };
    console.log(req.session.user);
    const updatedUser = await User.findByIdAndUpdate( _id,
        {
            avatarUrl : file ? file.path : avatarUrl,
            // file이 존재하지 않으면 file.path를 사용할 수 없음
            // upload 한 파일이 존재하면 upload한 파일을 새 파일로, 없다면 기존 avataUrl사용
            name,
            email,
            username,
            location,
            // database에 저장된 유저의 id값으로 user를 찾고 edit-profile 페이지에 user가 입력한 정보로 수정
        },
        { new : true }
    );

    req.session.user = updatedUser;
    return res.redirect("/users/edit");
};

export const getChanagePassword = (req,res) => {
    if (req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", {pageTitle : "Change Password"});
}
export const postChanagePassword = async (req,res) => {
    // send notification
    const {
        session : {
            user : { _id },
        },
        body : {
            oldPassword,
            newPassword,
            newPasswordCheck,
        }
    } = req;
    const user = await User.findById(_id);
    // 현재 접속한 user의 정보를 user 변수에 선언
    const ok = await bcrypt.compare(oldPassword, user.password);
    // 사용자가 for m으로 보낸 비밀번호와, session에 있는 비밀번호를 비교
    
    if (!ok) {
        res.status(400).render("users/change-password", {pageTitle : "Change Password", errorMessage : "The Current password is incorrect"});
        // 사용자가 form으로 보내어 변경한 비밀번호와 기존 사용자의 비밀번호가 같지 않으면 에러메세지
    } else {
        if(newPassword !== newPasswordCheck) {
            res.status(400).render("users/change-password", {pageTitle : "Change Password", errorMessage : "The Password does not match"});
            // 새로운 비밀번호가 확인이 안될 경우 에러메세지
        } else {
            user.password = newPassword;
            // 사용자의 비밀번호를 form에 입력된 새로운 비밀번호로 변경
            await user.save();
            // 새로운 비밀번호를 해시값으로 저장
            
            req.session.destroy();
            return res.redirect("/login");
            // 비밀번호 변경후 로그아웃
        };
    };
};

export const see = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("videos");
    if(!user) {
        return res.status(404).render("404", {pageTitle : "User not found"});
    }

    return res.render("users/profile", {
        pageTitle : `${user.name}'s Profile`, 
        user,
    });
};

/*
Cookies
- 유저를 기억하는 방법
- 

Sessions
- 백엔드와 브라우저 간에 어떤 활동을 했는지 기억하는 것
- 백엔드와 브라우저 사이의 memory, history 같은 것
- 작동하려면 백엔드와 브라우저가 정보를 가지고 있어야함

Stateless
- 한번 연결 되었다가 끝나는 것

express-session
- express에서 세션을 처리할 수 있게 해주는 middleware
*/