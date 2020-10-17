const express=require('express');
const path=require('path');
const app=express();

app.get("/",(req,res)=>{
res.send("Hello There");
});


if(process.env.NODE_ENV==='production'){
    app.get("*",(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build',"index.html"));
    })
}
let port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});