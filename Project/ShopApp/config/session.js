import mongodbStore from "connect-mongodb-session";
import session from "express-session";

function createSessionStore() {
    const MongoDBStore = mongodbStore(session);

    const store = new MongoDBStore({
        uri: "mongodb://127.0.0.1:27017/",
        database: "online-shop",
        collection: "sessions"
    })

    return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}



export default createSessionConfig;