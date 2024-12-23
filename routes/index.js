var express = require('express');
const UserController = require('../constrollers/user-controller');
const ProductController = require('../constrollers/product-controller');
const authenticateToken = require('../middleware/auth');
var router = express.Router();
require('dotenv').config();

//Роуты пользователя
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//Роуты постов
router.post('/products', authenticateToken, ProductController.create)
router.delete('/products/:id', authenticateToken, ProductController.delete)
router.put('/products/:id', authenticateToken, ProductController.update)
router.get('/products', authenticateToken, ProductController.getAllProducts)
router.post('/products/copy/:id', authenticateToken, ProductController.copyProduct)

module.exports = router;
