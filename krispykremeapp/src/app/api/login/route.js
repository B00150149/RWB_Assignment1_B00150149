
import { getCustomSession } from '../sessionCode.js';

// // //*********************************** KYLE FIXED CODE *****************************************8
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
    const url = process.env.DB_ADDRESS
    
    const client = new MongoClient(url);
    const dbName = 'app'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users'); // collection name

    const findResult = await collection.find({ email: email, pass: pass }).toArray();

    console.log('Found documents =>', findResult);

    let valid = false
    let role = "";

    if(findResult.length >0 ){
    
        role = findResult[0].type;
        //Sessions start
        let session = await getCustomSession()
        session.role = findResult[0].type;//'customer';
        session.email = email;
        await session.save();

        console.log(session.email);
        console.log(findResult[0].type);
        valid = true;
        console.log("login valid");
    
    } else {
    valid = false;
    console.log("login Invalid");
   
    }

    // at the end of the process we need to send something back.
    return Response.json({ "status":valid,"role":role })
    }
    





























