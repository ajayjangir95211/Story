import bcrypt from "bcryptjs";
import db from "../data/database.js";
import mongodb from "mongodb";

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);
        return db.getDb().collection("users").findOne({ _id: uid }, {
            projection: {
                password: false
            }
        });
    }

    getUserWithSameEmail() {
        return db.getDb().collection("users").findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = this.getUserWithSameEmail();
        if (existingUser)
            return true;
        else
            return false;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        let database = db.getDb();
        await db.getDb().collection("users").insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
}

export default User;