export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
     console.log("in the register api page")
     // get the values
     // that were sent across to us.
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    const address = searchParams.get('address');
    const num = searchParams.get('num');
    const type = searchParams.get("type");

    console.log("Received email:", email);
    console.log("Received pass:", pass);
    console.log("Received address:", address);
    console.log("Received phone number:", num);
    console.log("Received user type:", type);

    //store a password as a hash in the database 
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hash = bcrypt.hashSync(pass, saltRounds);

    // Validate input
if (!email || !pass || !address || !num || !type) {
  console.log("Invalid input detected");
  return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
}


     // =================================================
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS
    const client = new MongoClient(url);
    const dbName = 'app';
  
      // Connect to MongoDB
      await client.connect();
      console.log("Connected successfully to MongoDB Atlas");
  
      const db = client.db(dbName);
      const collection = db.collection('users');
  
      // Insert the user data
      const user = { email, pass: hash, address, num, type, createdAt: new Date() };
      const insertResult = await collection.insertOne(user);
  
      console.log("Insert result:", insertResult);
  
      // Return success response
      return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
   
  }
  