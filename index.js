const express = require('express');
const cors = require('cors');
const port=process.env.PORT || 5000;

const app=express();

app.use(express.json());
app.use(cors());

const produts=[]

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