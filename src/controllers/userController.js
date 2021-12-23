import User from "../models/user";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"})
};

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            // 상태코드 를 브라우저에게 보내주냐 아니냐에 따라 url 히스토리 기록 여부가 결정됨
            pageTitle,
            errorMessage : "Password confirmmation does not match",
        });
    }

    const exists = await User.exists({ $or : [
        { username },
        { email },
    ] });

    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage : "This username/email is already taken",
        });
    }

    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
    } catch(error) {
        console.log(error);
        return res.status(400).render("Join", {
            pageTitle,
            errorMessage : error._message,
        });
    }
    
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
    return res.render("login", {pageTitle : "Log in"})
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(400).render("login", {
            pageTitle, 
            errorMessage  : "Account not found"
        });
    };

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage : "Wrong password"
        });
    }
    console.log("LOG USER IN! COMMING SOON!");
    return res.redirect("/"); 
}

export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");

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