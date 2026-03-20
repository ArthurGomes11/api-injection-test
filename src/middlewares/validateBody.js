function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Dados invalidos',
        errors: parsed.error.issues,
      });
    }

    req.body = parsed.data;
    return next();
  };
}

module.exports = { validateBody };
