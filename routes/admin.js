const express= require('express');

const router= express.Router();

const path=require('path');

const rootDir = require('../util/path');

const adminController = require('../controllers/admin')

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.getAddProduct); 

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productID', adminController.getEditProduct);

router.post('/edit-product', adminController.updateProduct);

router.post('/delete-product', adminController.deleteProduct)



module.exports = router;
