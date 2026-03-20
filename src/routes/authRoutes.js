const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { registerSchema, loginSchema } = require('../schemas/authSchema');
const { validateBody } = require('../middlewares/validateBody');
const { authRequired } = require('../middlewares/authMiddleware');
const { generateToken } = require('../utils/generateToken');

const router = express.Router();

router.post('/register', validateBody(registerSchema), async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: 'Email ja cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
  });

  return res.status(201).json({
    message: 'Usuario criado com sucesso',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Credenciais invalidas' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciais invalidas' });
  }

  const token = generateToken(user);

  return res.status(200).json({
    message: 'Login realizado com sucesso',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

router.get('/me', authRequired, async (req, res) => {
  const user = await User.findById(req.user.sub).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'Usuario nao encontrado' });
  }

  return res.status(200).json({ user });
});

module.exports = router;
