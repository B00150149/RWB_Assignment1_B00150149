// //******************RIGHTCODE ***************************************** */
export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the empty cart api page")
    // =================================================
    const { MongoClient } = require('mongodb');
   // const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster'
   const url = process.env.DB_ADDRESS

    const client = new MongoClient(url);
    const dbName = 'app'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // collection name

        await collection.deleteMany({});
        console.log('All Items deleted successfully');
        
    
   
    //==========================================================
    // at the end of the process we need to send something back.
    return Response.json({"status":"deleted"})
    }
    






// //******************CODE FIX? ***************************************** */

// export async function GET(req) {
//     console.log("in the api page");

//     const { MongoClient } = require('mongodb');
//     const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
//     const client = new MongoClient(url);
//     const dbName = 'app';

//     try {
//         await client.connect();
//         console.log('Connected successfully to server');
//         const db = client.db(dbName);
//         const collection = db.collection('shopping_cart');

//         await collection.deleteMany({});
//         console.log('All Items deleted successfully');

//         // Use the Web Fetch API's Response object
//         return new Response(JSON.stringify({ message: 'Cart items deleted successfully.' }), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error deleting items:', error);

//         return new Response(JSON.stringify({ message: 'Error deleting items.', error }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } finally {
//         await client.close(); // Ensure the client is closed properly
//     }
// }














