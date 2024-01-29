function handleErrors(error, req, res, next) {
    console.log(error);
    console.log("Inside handler");
    if (error.code === 404)
        return res.status(404).render("shared/404.ejs");

    res.status(500).render("shared/500.ejs");
}

export default handleErrors;