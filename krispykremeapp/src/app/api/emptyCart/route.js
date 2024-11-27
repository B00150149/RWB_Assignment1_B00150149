//******************RIGHTCODE ***************************************** */
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
    try{
        await collection.deleteMany({});
        console.log('All Items deleted successfully');
        res.status(200).json({ message: 'Cart items deleted successfully.' });
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting items.', error });
    }
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json(findResult)
    }
    



