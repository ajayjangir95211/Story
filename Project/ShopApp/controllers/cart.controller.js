import Product from "../models/product.model.js";

async function addCartItem(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.body.productid);
    } catch (error) {
        next(error)
        return;
    }

    let cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: "Cart Updated",
        newTotal: cart.totalQuantity
    })
}

function getCart(req, res) {
    res.render("customer/cart/cart.ejs");
}

function updateCartItem(req, res) {
    const cart = res.locals.cart;
    let updatedItemPrice = 0;
    const updatedItem = cart.updateItem(req.body.productid, req.body.quantity);
    if (updatedItem)
        updatedItemPrice = updatedItem.price;
    req.session.cart = cart;
    res.json({
        message: "Item Updated!",
        updatedItemPrice: updatedItemPrice,
        newTotalPrice: cart.totalPrice,
        newTotalQuantity: cart.totalQuantity
    });
}

export default {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem: updateCartItem
}