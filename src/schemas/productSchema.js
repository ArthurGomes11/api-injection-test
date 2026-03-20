const { z } = require('zod');

const productSchema = z.object({
  name: z.string().min(2).max(120),
  category: z.string().min(2).max(80),
  description: z.string().min(10).max(500),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  active: z.boolean().optional(),
});

const productUpdateSchema = productSchema.partial();

module.exports = {
  productSchema,
  productUpdateSchema,
};
