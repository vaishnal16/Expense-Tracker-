const express = require('express');
const {createCategaries}=require('../controllers/controllers');

const router=express.Router();

router.post('/api/categaries',createCategaries);


module.exports=router;






