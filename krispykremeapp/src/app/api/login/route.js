export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the login api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    console.log(email);
    console.log(pass);
    // database call goes here
    // =================================================
    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster'
    const client = new MongoClient(url);
    const dbName = 'app'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users'); // collection name

    //const findResult = await collection.find({"email": "sample@test.com"}).toArray();
    const findResult = await collection.find({ email: email, pass: pass }).toArray();

    console.log('Found documents =>', findResult);
    let valid = false

    if(findResult.length >0 ){
    valid = true;
    console.log("login valid")
    
    } else {
    valid = false;
   
    }

    return Response.json({ "status":valid })
    //==========================================================


    // at the end of the process we need to send something back.
   
    }
    
