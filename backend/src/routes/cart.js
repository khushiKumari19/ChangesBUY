const express = require('express')
const { requireSignin } = require('../common-middleware')
const { addItemToCart, getCartItems, removeCartItems } = require('../controllers/cart')
const router = express.Router()


router.post('/user/cart/addtocart',requireSignin,addItemToCart);
router.post('/user/getCartItems',requireSignin,getCartItems);
router.post('/user/cart/removeItem',requireSignin,removeCartItems);

module.exports = router