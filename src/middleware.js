export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    // response할 때 login상태를 요청할때 session에 저장된 loggin 상태로 locals object에 저장, 참 일 경우 loggedInUser에 로그인한 유저의 정보를 저장한다.
    // res.locals에 key를 loggedIn, value를 req.session.loggedIn의 Boolean값으로 정의
    res.locals.siteName = "Wetube";
    // res.local에 siteName key에 Wetube을 value로 정의
    res.locals.loggedInUser = req.session.user || {};
    // response할 때 login한 user는 요청한 세션의 유저로 locals object에 저장
    //res.locals => An object that contains reponse local variables scoped to the request, and therefore available only th the view rendered durinf that request cycle.
    next();
}; // locals object에 user의 정보를 저장해주는 middleware

export const protectorMiddleware = (req, res, next) => {
    // login이 false인 사용자는 로그인 페이지로 redirect할 수 있게하는 middleware
    if (req.session.loggedIn) {
        // user가 loggdeIn되어있으면 next()함수 호출
        next();
    } else {
        res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    // 로그인 되어있는 사용자들이 로그아웃된 사용자들만 접근 가능한 페이지로 가지 못하게하는 middleware
    if (!req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/");
    }
}