const express = require('express');

const Product = require('../models/Product');
const { productSchema, productUpdateSchema } = require('../schemas/productSchema');
const { validateBody } = require('../middlewares/validateBody');
const { authRequired, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({ active: true }).sort({ createdAt: -1 });
  return res.status(200).json({ count: products.length, products });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto nao encontrado' });
  }

  return res.status(200).json({ product });
});

router.post('/', authRequired, requireRole('admin'), validateBody(productSchema), async (req, res) => {
  const product = await Product.create(req.body);
  return res.status(201).json({ message: 'Produto criado com sucesso', product });
});

router.patch(
  '/:id',
  authRequired,
  requireRole('admin'),
  validateBody(productUpdateSchema),
  async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Produto nao encontrado' });
    }

    return res.status(200).json({ message: 'Produto atualizado com sucesso', product });
  }
);

router.delete('/:id', authRequired, requireRole('admin'), async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto nao encontrado' });
  }

  return res.status(200).json({ message: 'Produto removido com sucesso' });
});

module.exports = router;
