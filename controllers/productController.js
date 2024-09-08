const Product = require('../models/Product'); // Importar el modelo de productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Obtener todos los productos de la base de datos
    res.json(products); // Enviar los productos como respuesta en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' }); // Manejar errores
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, image_url, text } = req.body;
    const newProduct = await Product.create({ 
      name, 
      price, 
      category, 
      image_url, 
      text
    });
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating product' });
  }
}
// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, image_url, text } = req.body;
    const [updated] = await Product.update(
      { name, price, category, image_url, text },
      { where: { id } }
    );
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.json(updatedProduct); // Enviar el producto actualizado como respuesta
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating product' }); // Manejar errores
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); // Enviar respuesta sin contenido si se eliminó el producto
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' }); // Manejar errores
  }
};