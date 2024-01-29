function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}

export default addCsrfToken;