const express=require('express');
const path=require('path');
const app=express();


if(process.env.NODE_ENV==='production'){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build',"index.html"));
    })
}


app.get("/",(req,res)=>{
    res.send("Hello There");
    });
    
let port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});