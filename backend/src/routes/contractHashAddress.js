const express = require('express')
const { createContractHashAddress, getAddress } = require('../controllers/contractHashAddress')
const router = express.Router()

router.post('/postAddress',createContractHashAddress);
router.get('/getAddress',getAddress);
module.exports = router;

