import User from "../models/user";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"})
};

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.render("join", {
            pageTitle,
            errorMessage : "Password confirmmation does not match",
        });
    }
    
    const exists = await User.exists({ $or : [
        { username },
        { email },
    ] });
    if (exists) {
        return res.render("join", {
            pageTitle,
            errorMessage : "This username/email is already taken",
        });
    }
    await User.create({
        name,
        username,
        email,
        password,
        location,
    });
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

export const login = (req, res) => res.render("login", {pageTitle : "Log in"});
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
