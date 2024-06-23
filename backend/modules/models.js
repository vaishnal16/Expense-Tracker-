const mongoose = require('mongoose');

const schema= mongoose.Schema

//definning schema

//categories=>field=>[type,color]
const categories_model=new schema({
    type:{
        type:String,
        default:"Investment",
    },
    color:{
        type:String,
        default:'#FCBE44'
    }
})

//transaction=>field=>[name,type,amount,date]
const transaction_model=new schema({
    name:{
        type:String,
        default:"Annonymous",
    },
    type:{
        type:String,
        default:"Investment",
    },
    amount:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//schema->model
const Categories=mongoose.model('categories',categories_model)
const Transaction=mongoose.model('transaction',transaction_model)

module.exports={
    Categories,
    Transaction
}

