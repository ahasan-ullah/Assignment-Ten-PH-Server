const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app=express();

app.use(express.json());
app.use(cors());

console.log();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n7txs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database=client.db("productsDB");
    const products=database.collection("all-products");


    app.get('/all-products',async(req,res)=>{
      const cursor=products.find();
      const result=await cursor.toArray();
      res.send(result);
    })

    app.get('/all-products/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result=await products.findOne(query);
      res.send(result);
    })

    app.get('/all-products-by-email/:email',async(req,res)=>{
      const email=req.params.email;
      const query={userEmail: email};
      const result=await products.find(query).toArray();
      res.send(result);
    })
    
    app.post('/all-products',async(req,res)=>{
      const product=req.body;
      const result=await products.insertOne(product);
      res.send(result);
    })

    app.put('/all-products/:id',async(req,res)=>{
      const id=req.params.id;
      const product=req.body;
      const filter={_id: new ObjectId(id)};
      const options={upsert: true};
      const updatedProduct={
        $set:{
          image: product.image,
          item: product.item,
          category: product.category,
          description: product.description,
          price: product.price,
          rating: product.rating,
          customization: product.customization,
          processingTime: product.processingTime,
          stockStatus: product.stockStatus,
          userEmail: product.userEmail,
          userName: product.userName
        }
      };
      const result=await products.updateOne(filter,updatedProduct,options);
      res.send(result);
    })


    app.delete('/all-products/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)};
      const result=await products.deleteOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
  res.send("basic server is running");
});

app.listen(port,()=>{
  console.log("basic server setup done");
})