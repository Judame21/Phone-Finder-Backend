const express = require('express');
const cors = require('cors'); // Agrega esta línea para importar cors
const app = express();
const sequelize = require('./config/db');
const port = process.env.PORT || 3000;
const User = require('./models/User');
const Product = require('./models/Product');

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors()); // Permite todas las solicitudes desde cualquier origen

// Sincroniza la base de datos y los modelos
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

// Middleware para parsear cuerpos de solicitudes JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Hola desde mi backend Node.js!');
});

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/api/products/:id', async (req, res) => {
  try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
          return res.status(404).send('Product not found');
      }
      res.json(product);
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Server error');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
