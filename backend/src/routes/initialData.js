const express = require('express')
const { requireSignin } = require('../common-middleware')
const { initialData } = require('../controllers/initialData')
const router = express.Router()

router.post('/initialData',initialData)

module.exports = router;