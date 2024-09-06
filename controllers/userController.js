const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const register = [
  // Validación de entrada
  body('username').isString().notEmpty(),
  body('password').isLength({ min: 5 }),
  body('nombre').isString().optional(),
  async (req, res) => {
    // Validar resultados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, admin, nombre } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ 
        username, 
        password: hashedPassword, 
        admin: !!admin, 
        nombre 
      });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
  }
];

const login = [
  // Validación de entrada
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    // Validar resultados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).json({ error: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error logging in' });
    }
  }
];

module.exports = { register, login };
