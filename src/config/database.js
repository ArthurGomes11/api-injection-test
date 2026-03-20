const mongoose = require('mongoose');
const env = require('./env');

async function connectDatabase() {
  await mongoose.connect(env.MONGO_URI);
  console.log('MongoDB conectado com sucesso');
}

module.exports = { connectDatabase };
