const express = require('express');
const controller=require('../controllers/controllers');

const router=express.Router();

router.route('/api/categaries')
      .post(controller.createCategaries)
      .get(controller.getCategaries)

router.route('/api/transactions')
      .post(controller.createTransaction)
      .get(controller.getTransaction)
      .delete(controller.deleteTransaction)

router.route('/api/labels')  
      .get(controller.getLabels)    

module.exports=router;






