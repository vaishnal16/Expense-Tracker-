const express = require('express');
const router =require('../routes/routes');
const model=require('../modules/models');

const createCategaries = async (req, res) => {
    try {
        const Create = new model.Categories({
            type: "Savings",
            color: "#1f3b5c",
        });

        await Create.save(); // Save the document
        return res.json(Create); // Respond with the created document
    } catch (err) {
        return res.status(400).json({ message: "error while creating", err });
    }
};


module.exports= {
    createCategaries,
} ;