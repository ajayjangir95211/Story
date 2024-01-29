import Product from "./product.model.js";

class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
    }

    addItem(product) {
        this.totalQuantity++;
        this.totalPrice += product.price;

        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].product.id === product.id) {
                this.items[index].quantity++;
                this.items[index].price += product.price;
                return;
            }
        }

        const cartItem = {
            product: product,
            quantity: 1,
            price: product.price
        }
        this.items.push(cartItem);
    }

    updateItem(productid, newQuantity) {
        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].product.id === productid) {
                this.totalPrice -= this.items[index].price;
                this.totalQuantity -= this.items[index].quantity;

                if (newQuantity > 0) {
                    this.items[index].quantity = parseInt(newQuantity);
                    this.items[index].price = this.items[index].product.price * this.items[index].quantity;
                    this.totalPrice += this.items[index].price;
                    this.totalQuantity += this.items[index].quantity;
                    return this.items[index];
                } else {
                    this.items.splice(index, 1);
                }
            }
        }
    }

    async updatePrices() {
        const productIds = this.items.map(function (item) {
            return item.product.id;
        });

        const products = await Product.findMultiple(productIds);

        const deletableCartItemProductIds = [];

        for (const cartItem of this.items) {
            const product = products.find(function (prod) {
                return prod.id === cartItem.product.id;
            });

            if (!product) {
                deletableCartItemProductIds.push(cartItem.product.id);
                continue;
            }

            cartItem.product = product;
            cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
        }

        if (deletableCartItemProductIds.length > 0) {
            this.items = this.items.filter(function (item) {
                return deletableCartItemProductIds.indexOf(item.product.id) < 0;
            });
        }

        this.totalQuantity = 0;
        this.totalPrice = 0;

        for (const item of this.items) {
            this.totalQuantity = this.totalQuantity + item.quantity;
            this.totalPrice = this.totalPrice + item.totalPrice;
        }
    }
}

export default Cart;