import express from "express";
import adminController from "../controllers/admin.controller.js";
import ordersController from "../controllers/orders.controller.js";
import cMM from "../middlewares/image-upload.js";

const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

router.post("/products", cMM, adminController.createNewProduct);

router.get("/products/:id", adminController.getUpdateProduct);

router.post("/products/:id", cMM, adminController.updateProduct);

router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

router.patch("/orders/:id", adminController.updateOrder);

export default router;