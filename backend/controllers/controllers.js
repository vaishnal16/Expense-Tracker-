const express = require("express");
const router = require("../routes/routes");
const model = require("../modules/models");

//post request on /api/categories
const createCategaries = async (req, res) => {
  try {
    const Create = new model.Categories({
      type: "Investment",
      color: "#1f3b5c",
    });

    await Create.save(); // Save the document
    return res.json(Create); // Respond with the created document
  } catch (err) {
    return res.status(400).json({ message: "error while creating", err });
  }
};

//get request on /api/categories
const getCategaries = async (req, res) => {
  const data = await model.Categories.find({});
  return res.json(data);
};

//post request on /api/transactions
const createTransaction = async (req, res) => {
  const { name, type, amount } = req.body;
  if (!name || !type || !amount)
    return res.status(400).json({ message: "data not provided" });
  try {
    // Create a new transaction instance
    const newTransaction = new model.Transaction({
      name,
      type,
      amount,
      date: new Date(),
    });

    // Save the transaction to the database
    const savedTransaction = await newTransaction.save();

    // Respond with the saved transaction
    return res.status(201).json(savedTransaction);
  } catch (err) {
    // Handle any errors that occur
    return res
      .status(500)
      .json({ message: `Error while creating transaction: ${err.message}` });
  }
};

//get request on /api/transactions
const getTransaction = async (req,res)=>{
    const data=await model.Transaction.find({});
    return res.json(data);
};

//delete request on /api/transactions
const deleteTransaction = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "No parameter passed" });
        }

        const result = await model.Transaction.deleteOne(req.body);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.json({ message: "Deleted transaction" });
    } catch (err) {
        return res.status(500).json({ message: `Error while deleting transaction: ${err.message}` });
    }
};

//get request on /api/labels
const getLabels=async(req,res)=>{
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info",
        }
    ]).then(result=>{
        let data=result.map(v=>Object.assign({},{_id:v._id,name:v._name,type:v.type,amount:v.amount,color:v.categories_info['color']}))
        res.json(data)
    }).catch(err=>{
        res.status(400).json({message:`lookup error ${err}`})
    })
}


module.exports = {
  createCategaries,
  getCategaries,
  createTransaction,
  getTransaction,
  deleteTransaction,
  getLabels,
};
