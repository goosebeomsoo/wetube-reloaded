export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user;
    console.log(res.locals);
    next();
}; // locals object에 user의 정보를 저장해주는 middleware