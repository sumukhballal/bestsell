
    
const express = require('express');
const router = express.Router();
const { GetStores } = require('../dataAccessLayer/store-controller');

//get all Shipping Regions
router.get('/getStores', GetStores);

module.exports = router;