import express from "express";
import productsController from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products", productsController.getAllProducts);

router.get("/products/:id", productsController.getProductDetails);

export default router;