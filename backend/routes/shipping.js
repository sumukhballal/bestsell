
    
const express = require('express');
const router = express.Router();
const { GetShippingRegions , GetShippingDetailsWithOrderId} = require('../dataAccessLayer/shipping-controller');

//get all Shipping Regions
router.get('/getShippingRegions', GetShippingRegions);
router.get('/getShippingDetails', GetShippingDetailsWithOrderId);

module.exports = router;