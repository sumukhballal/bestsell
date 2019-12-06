
    
const express = require('express');
const router = express.Router();
const { GetStores } = require('../dataAccessLayer/store-controller');
const { GetAllProductQuantity } = require('../dataAccessLayer/inventory-controller');

//get all Shipping Regions
router.get('/getStores', GetStores);
router.get('/getstoreproducts',GetAllProductQuantity);

module.exports = router;