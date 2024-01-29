import express from "express";
import ordersController from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/", ordersController.addOrder);

router.get("/", ordersController.getOrders);

export default router;