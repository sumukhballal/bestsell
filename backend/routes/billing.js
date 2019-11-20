const express = require('express');
const router=express.Router();
const { GetBills } = require('../dataAccessLayer/billing-controller');

//get all departments
router.get('/getBill', GetBills);

module.exports=router;

