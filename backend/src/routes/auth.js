const express = require('express')
const router = express.Router()
const { signup, signin, signout } = require('../controllers/auth')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth')

router.post('/signup',validateSignupRequest,isRequestValidated,signup);
router.post('/signin',validateSigninRequest,isRequestValidated,signin);
router.post('/signout',signout)

module.exports = router;
