const PORT = 8000;
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import db from "./data/database.js";
import authRoutes from './routes/auth.routes.js';
import baseRoutes from './routes/base.routes.js';
import productsRoutes from './routes/products.routes.js';
import adminRoutes from "./routes/admin.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import ordersRoutes from "./routes/orders.routes.js"
import { error } from "console";
import csrf from "csurf";
import cardMiddleware from "./middlewares/cart.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import addCsrfTokenMiddleware from "./middlewares/csrf-token.js";
import notFoundHandler from "./middlewares/not-found.js";
import updateCartPrices from "./middlewares/update-cart-prices.js";
import createSessionConfig from "./config/session.js";
import expressSession from "express-session";
import checkAuthStatus from "./middlewares/check-auth.js";
import protectRoutes from "./middlewares/protect-routes.js";
import router from "./routes/auth.routes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(checkAuthStatus);
app.use(cardMiddleware);
app.use(updateCartPrices);
app.use(addCsrfTokenMiddleware);
app.use(authRoutes);
app.use(baseRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", protectRoutes, ordersRoutes);
app.use("/admin", protectRoutes, adminRoutes);
app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

db.connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running...");
    })
}).catch((error) => {
    console.log("Failed to connect to database!");
    console.log(error);
})

