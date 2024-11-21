export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // =================================================
    const { MongoClient } = require('mongodb');
    //const url = 'mongodb://root:example@localhost:27017/';
    const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster'


    const client = new MongoClient(url);
    const dbName = 'app'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // collection name
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }
    



// export async function GET(req, res) {
//     const { MongoClient } = require('mongodb');

//     const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
//     const client = new MongoClient(url);
//     const dbName = 'app';

//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('shopping_cart');

//     // Fetch all items from the shopping cart
//     const cartItems = await collection.find({ username: "sample@test.com" }).toArray();

//     return Response.json(cartItems); // Return all cart items
// }
