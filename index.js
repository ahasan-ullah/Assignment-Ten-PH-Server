const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


const app=express();

app.use(express.json());
app.use(cors());

const produts=[]


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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
  res.send("basic server is running");
});

app.get('/all-products',(req,res)=>{
  res.send(produts);
})

app.post('/all-products',(req,res)=>{
  const allProducts=req.body;
  produts.push(allProducts);
  res.send(allProducts)
})

app.listen(port,()=>{
  console.log("basic server setup done");
})