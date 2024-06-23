const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connection=require('./db/connection');

const app=express();

require('dotenv').config({path:'./config.env'});
const port=process.env.PORT||8000;

//middleware 
app.use(cors());
app.use(express.json());

//using routes
app.use(require('./routes/routes'));

app.listen(port,(req,res)=>{
    console.log(`Server started on  http://localhost:${port}`);
})


