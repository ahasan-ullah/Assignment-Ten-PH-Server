const express = require('express');
const cors = require('cors');
const port=process.env.PORT || 5000;

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("basic server is running");
});

app.get('/all-products',(req,res)=>{
  res.send("Hello from products");
})

app.post('/all-products',(req,res)=>{
  const Allproducts=req.body;
  res.send(Allproducts)
})

app.listen(port,()=>{
  console.log("basic server setup done");
})