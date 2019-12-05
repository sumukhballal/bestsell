
    
const express = require('express');
const router = express.Router();
const {
    AuthenticateLogin,
    RegisterCustomer,
    UpdateCustomer,
    Logout
} = require('../dataAccessLayer/customer-controller');

//register new user
router.post('/addNewCustomer', RegisterCustomer);

//get username and password
router.post('/authenticateLogin', AuthenticateLogin);

//Edit  Customer Info

router.post('/updateCustomer',UpdateCustomer)

// Logout from the system
router.get('/logout', Logout)

module.exports = router;