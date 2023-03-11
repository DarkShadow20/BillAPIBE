const express=require('express');
const {
	getCustomers,
    addCustomer,
    editCustomer
} = require('../controllers/customer.controller');
const { isAuthorized } = require('../middlewares/authHandler');
const router=express.Router();

router.route('/').get(isAuthorized,getCustomers);
router.route('/addCustomer').post( isAuthorized, addCustomer);
router.route('/:customerId').post( isAuthorized, editCustomer);


module.exports = router;
