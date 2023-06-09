const express = require('express');
const userRoutes = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const productImgRouter = require('./productImg.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/users', userRoutes)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/products_images', productImgRouter)
router.use('/carts', cartRouter)
router.use('/purchases', purchaseRouter)

module.exports = router;