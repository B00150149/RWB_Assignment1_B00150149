export async function GET(req, res) {
     // Make a note we are on 
     // the api. This goes to the console.  
    console.log("in the putInCart api page")
  
     // get the values 
     // that were sent across to us. 
    const { searchParams } = new URL(req.url);
    const pname = searchParams.get('pname') ;
    const price = searchParams.get('price');
    const pdesc = searchParams.get('pdesc');
    const image = searchParams.get('image');
  
    console.log('Received parameters:', { pname, pdesc, price, image });
  
    const imagePath = `${image}`;
    console.log(`Product Name: ${pname}, Price: ${price}, Description: ${pdesc}, Image Path: ${imagePath}`);
  

   // =================================================
    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
    const client = new MongoClient(url);
    const dbName = 'app';
  
    
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('shopping_cart');
  
        const myobj = {
            pname: pname,
            pdesc: pdesc,
            price: price,
            image: imagePath
        };
  
        const insertResult = await collection.insertOne(myobj);
        console.log('Insert Result:', insertResult);


      //==========================================================
    
       // at the end of the process we need to send something back. 
        return new Response(JSON.stringify({ data: "inserted" }), { status: 200 });
   
  }
  




// export async function GET(req, res) {
//     // Make a note we are on 
//     // the api. This goes to the console.  
//     console.log("in the putInCart api page")
  
//     // get the values 
//     // that were sent across to us. 
//     const { searchParams } = new URL(req.url)  
//     const pname = searchParams.get('pname')
//     const price = searchParams.get('price'); 
//     const pdesc = searchParams.get('pdesc'); 
//     const image = searchParams.get('image'); 

//     // Construct the full image path.
//     const imagePath = `/images/${image}`;
 
//     //console.log(pname);
//     console.log(`Product Name: ${pname}, Price: ${price}, Description: ${pdesc}, Image: "/images/${imagePath}"`);

  
//    // =================================================
//     const { MongoClient } = require('mongodb');
  
//     //const url = 'mongodb://root:example@localhost:27017/';  
//     const url = 'mongodb+srv://root:myPassword123@krispykremecluster.2a1di.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeCluster';
//     const client = new MongoClient(url);  
//     const dbName = 'app'; // database name
  
  
//     await client.connect();  
//     console.log('Connected successfully to server');  
//     const db = client.db(dbName);  
//     const collection = db.collection('shopping_cart'); // collection name
  
//     //var myobj = { username: "sample@test.com", pname: pname, price: price, };  
//     const myobj = {
//       username: "sample@test.com", // Static username for now
//       pname: pname,
//       pdesc: pdesc,
//       price: price,
//       image: imagePath
//   };
 
//     //var myobj = { username: "sample@test.com", pname: pname,  pdesc: pdesc, price: price,  image:`/images/${item.image}`};  
//     const insertResult = await collection.insertOne(myobj);
//     console.log('Insert Result:', insertResult);
 
//    //==========================================================
    
//     // at the end of the process we need to send something back. 
//     return Response.json({ "data":"" + "inserted" + ""})


    
  
//   }
  
  
  