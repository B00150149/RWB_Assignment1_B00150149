    export async function GET(req, res) {
        // Make a note we are on
        // the api. This goes to the console.
        console.log("in the api page")
        // =================================================
        const { MongoClient } = require('mongodb');
        // const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster'
        const url = process.env.DB_ADDRESS
try{
        const client = new MongoClient(url);
        const dbName = 'app'; // database name
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('products'); // collection name
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
}catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal Server Error' });
}
        //==========================================================
        // at the end of the process we need to send something back.
        return Response.json(findResult)
        }
        