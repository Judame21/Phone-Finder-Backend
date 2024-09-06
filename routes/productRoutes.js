const express = require('express');
const router = express.Router();

// Controladores
const productController = require('../controllers/productController');

// Ruta para obtener productos
router.get('/products', productController.getProducts);

module.exports = router;
