import monogodb from "mongodb"
const MongoClient = monogodb.MongoClient;
let database;

async function connectToDatabase() {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/");
    database = client.db("online-shop");
}

function getDb() {
    if (!database) {
        throw new Error("You must connect first");
    }
    return database;
}

export default {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}