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

    // Validate input
    if (!email || !pass || !address || !num || !type) {
      console.log("Invalid input detected");
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }
  
    // =================================================
    const { MongoClient } = require('mongodb');
    // const url ='mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
    const url = process.env.DB_ADDRESS
    const client = new MongoClient(url);
    const dbName = 'app';
  
    try {
      // Connect to MongoDB
      await client.connect();
      console.log("Connected successfully to MongoDB Atlas");
  
      const db = client.db(dbName);
      const collection = db.collection('users');
  
      // Insert the user data
      const user = { email, pass, address, num, type, createdAt: new Date() };
      const insertResult = await collection.insertOne(user);
  
      console.log("Insert result:", insertResult);
  
      // Return success response
      return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
    } catch (error) {
      console.error("Error occurred during registration:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    } finally {
        
      // Ensure MongoDB client is closed
      await client.close();
      console.log("MongoDB client closed");
    }
  }
  


// export async function GET(req, res) {
//     // Make a note we are on
//     // the api. This goes to the console.
//     console.log("in the register api page")
//     // get the values
//     // that were sent across to us.
//     const { searchParams } = new URL(req.url)
//     const email = searchParams.get('email')
//     const pass = searchParams.get('pass')
//     const address = searchParams.get('address')
//     const num = searchParams.get('num')

//     console.log(email);
//     console.log(pass);
//     console.log(address);
//     console.log(num);
    

//     // =================================================
//     const { MongoClient } = require('mongodb');
//     const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
//     const client = new MongoClient(url);
//     const dbName = 'app';
  
    
//         await client.connect();
//         console.log('Connected successfully to server');
//         const db = client.db(dbName);
//         const collection = db.collection('users');
  
//         const myobj = {
//             pname: pname,
//             pdesc: pdesc,
//             price: price,
//             image: imagePath
//         };
  
//         const insertResult = await collection.insertOne(myobj);
//         console.log('Insert Result:', insertResult);


//       //==========================================================
    
//        // at the end of the process we need to send something back. 
//         return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });

    
//     }
    