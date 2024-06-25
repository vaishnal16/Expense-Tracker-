const mongoose = require('mongoose');
require('dotenv').config({path:'./config.env'});
connectionString=process.env.URL;

const connectToMongoDB=
mongoose.connect(connectionString)
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("mongo error ", err);
})
module.exports=connectToMongoDB 
