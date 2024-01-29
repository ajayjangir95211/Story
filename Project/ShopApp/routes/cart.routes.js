import express from "express";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/items", cartController.addCartItem);

router.get("/", cartController.getCart);

router.patch("/items", cartController.updateCartItem);

export default router;