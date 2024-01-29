import express from "express"
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", authController.getSignup);

router.post("/signup", authController.signup);

router.get("/login", authController.getLogin);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export default router;