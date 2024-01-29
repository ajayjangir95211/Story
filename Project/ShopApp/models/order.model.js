import db from "../data/database.js";
import mongodb from "mongodb";

class Order {
    constructor(cart, userData, status = "pending", date, orderID) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                year: "numeric"
            })
        }
        this.id = orderID;
    }

    static transformOrderDocument(orderDoc) {
        return new Order(
            orderDoc.productData,
            orderDoc.userData,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id
        )
    }

    static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
    }

    static async findAll() {
        const ordres = await db.getDb().collection("orders").find().sort({ _id: -1 }).toArray();

        return this.transformOrderDocuments(ordres);
    }

    static async findAllForUser(userId) {
        const uid = new mongodb.ObjectId(userId);

        const orders = await db
            .getDb()
            .collection("orders")
            .find({ "userData._id": uid })
            .sort({ _id: -1 })
            .toArray();

        return this.transformOrderDocuments(orders);
    }

    static async findById(orderid) {
        const orderId = new mongodb.ObjectId(orderid);
        const order = await db.getDb().collection("orders").findOne({ _id: orderId });
        return this.transformOrderDocument(order);
    }
    save() {
        if (this.id) {
            const orderId = new mongodb.ObjectId(this.id);
            return db.getDb().collection("orders").updateOne({ _id: orderId }, {
                $set: { status: this.status }
            });
        }
        else {
            const orderDocument = {
                productData: this.productData,
                userData: this.userData,
                status: this.status,
                date: new Date()
            }
            return db.getDb().collection("orders").insertOne(orderDocument);
        }
    }
}

export default Order;