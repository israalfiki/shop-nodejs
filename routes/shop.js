const express= require('express');

const path= require('path');

const router= express.Router();

const rootDir = require('../util/path')
const shopController = require('../controllers/shop')

router.get('/', shopController.getProducts); 

router.get('/products/:productID', shopController.getProduct)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addToCart);

router.post('/cart/delete', shopController.deleteFromCart)

router.get('/orders', shopController.getOrders);
router.post('/add-order', shopController.addOrder)


router.get('/checkout', shopController.getCheckout);




module.exports = router;