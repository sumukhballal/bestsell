const express = require('express');
const router=express.Router();
const { GetCards } = require('../dataAccessLayer/card-controller');

//get all departments
router.get('/getCards', GetCards);

module.exports=router;

