const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Controladores
const productController = require('../controllers/productController');

// Ruta para obtener productos
router.get('/products', productController.getProducts);

// Crear un nuevo producto
router.post('/products', productController.createProduct);

// Actualizar un producto existente
router.put('/products/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/products/:id', productController.deleteProduct);

router.get('/products/categories', async (req, res) => {
    try {
        // Ajusta el modelo y los atributos según tu configuración
        const products = await Product.findAll({
            attributes: ['category'],
            // Si category es parte de una relación, usa include
            // include: [{ model: Category, attributes: ['name'] }]
        });

        // Convierte a minúsculas para evitar problemas de case sensitivity
        const categories = products.map(product => product.category);
        const uniqueCategories = [...new Set(categories)];

        res.json(uniqueCategories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).send('Error al obtener categorías');
    }
});
module.exports = router;
