const express=require('express');
const router=express.Router();

const {
	submitBill,
	findCustomerInfo,
	getInvoice
} = require('../controllers/invoice.controller');

const { isAuthorized } = require('../middlewares/authHandler');

router.route("/").get(getInvoice);

router.param("customerId",findCustomerInfo);

router.route('/:customerId').post(isAuthorized,submitBill);



module.exports = router;
