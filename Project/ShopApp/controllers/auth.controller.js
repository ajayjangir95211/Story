import User from "../models/user.model.js";
import authUtil from "../util/authentication.js";
import userDetailsAreValid from "../util/validation.js";
import sessionFlash from "../util/session-flash.js";

function getSignup(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: "",
            confirmEmail: "",
            password: "",
            fullname: "",
            street: "",
            postal: "",
            city: "",
        }
    }
    res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body["confirm-email"],
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    }
    if (!userDetailsAreValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    )
        ||
        !(req.body.email === req.body["confirm-email"])
    ) {
        sessionFlash.flashDataToSession(req,
            {
                errorMessage: "Please Check Your Input!",
                ...enteredData
            },
            () => {
                res.redirect("/signup");
            })
        return;
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            sessionFlash.flashDataToSession(req,
                {
                    errorMessage: "User Exists Already!",
                    ...enteredData
                },
                () => {
                    res.redirect("/signup");
                })
            return;
        }
        await user.signup();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect("/login");
}

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: "",
            password: ""
        }
    }
    res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res) {
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }
    if (!existingUser) {
        sessionFlash.flashDataToSession(req,
            {
                errorMessage: "User Not Found!",
                email: req.body.email,
                password: req.body.password
            },
            () => {
                res.redirect("/login");
            })
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req,
            {
                errorMessage: "Incorrect Password!",
                email: req.body.email,
                password: req.body.password
            },
            () => {
                res.redirect("/login");
            })
        return;
    }
    authUtil.createUserSession(req, existingUser, () => {
        res.redirect("/");
    })
}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect("/login");
}
export default {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
}