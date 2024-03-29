import Order from "../models/order.model.js";
import User from "../models/user.model.js";

async function getOrders(req, res) {
    try {
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render("customer/orders/all-orders", { orders: orders });
    } catch (error) {
        next(error);
    }
}

async function addOrder(req, res, error) {
    const cart = res.locals.cart;

    let userDocument;
    try {
        userDocument = await User.findById(res.locals.uid);
    } catch (error) {
        next(error);
        return;
    }

    const order = new Order(cart, userDocument,);

    try {
        order.save();
    } catch (error) {
        next(error);
    }

    req.session.cart = null;
    res.redirect("/orders");
}

export default {
    addOrder: addOrder,
    getOrders: getOrders
}