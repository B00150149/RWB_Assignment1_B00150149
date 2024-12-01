export async function GET(req, res) {
    // Make a note we are on 
    // the api. This goes to the console.  
   console.log("in the putOrders api page")
 
    // get the values 
    // that were sent across to us. 
   const { searchParams } = new URL(req.url);
   const email = searchParams.get('email') ;
   
    // Fetch data from the first API
    //const cartItemsResponse = await fetch('http://localhost:3000/api/getCartItems');
    
    const cartItemsResponse = await fetch('https://rwb-assignment1-b00150149-axl6u4pdi-tests-projects-a296a9af.vercel.app/api/getCartItems');  
    const cartItems = await cartItemsResponse.json();
    
    
   console.log('Received parameters:', { email});
 
   //const imagePath = `${image}`;
   console.log(`Product Name: ${email}`);
 

  // =================================================
   const { MongoClient } = require('mongodb');
  //  const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
  const url = process.env.DB_ADDRESS
   const client = new MongoClient(url);
   const dbName = 'app';
 
   
       await client.connect();
       console.log('Connected successfully to server');
       const db = client.db(dbName);
       const collection = db.collection('orders');

       // Calculate the total price by summing the prices of all items
      const total = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

    
       const myobj = {
            email: email,
            items: cartItems.map(item => ({
                item: item.pname,  // Assuming 'pname' is the product name
                price: item.price
              })),
              total: total,  // Add the total price
              OrderDate: new Date()
       };
 
       const insertResult = await collection.insertOne(myobj);
       console.log('Insert Result:', insertResult);


     //==========================================================
   
      // at the end of the process we need to send something back. 
       return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
  
 }
 




 
