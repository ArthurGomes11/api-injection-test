const bcrypt = require('bcryptjs');

const env = require('../config/env');
const { connectDatabase } = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');

const usersSeed = [
  {
    name: 'Admin Sistema',
    email: 'admin@loja.com',
    password: 'Admin1234',
    role: 'admin',
  },
  {
    name: 'Joao Pereira',
    email: 'joao@cliente.com',
    password: 'Cliente123',
    role: 'user',
  },
  {
    name: 'Mariana Alves',
    email: 'mariana@cliente.com',
    password: 'Cliente123',
    role: 'user',
  },
];

const productsSeed = [
  {
    name: 'Notebook Pro 14',
    category: 'Eletronicos',
    description: 'Notebook leve com 16GB RAM, SSD 512GB e processador de alto desempenho para trabalho diario.',
    price: 7499.9,
    stock: 12,
    active: true,
  },
  {
    name: 'Mouse Ergonomico MX',
    category: 'Acessorios',
    description: 'Mouse sem fio com ajuste de precisao e design ergonomico para longas jornadas de uso.',
    price: 299.9,
    stock: 45,
    active: true,
  },
  {
    name: 'Cadeira Office Comfort',
    category: 'Moveis',
    description: 'Cadeira para escritorio com apoio lombar, bracos ajustaveis e revestimento respiravel.',
    price: 1299,
    stock: 18,
    active: true,
  },
  {
    name: 'Monitor UltraWide 29',
    category: 'Eletronicos',
    description: 'Monitor ultrawide com resolucao Full HD e taxa de atualizacao ideal para produtividade.',
    price: 1899,
    stock: 20,
    active: true,
  },
  {
    name: 'Teclado Mecanico TKL',
    category: 'Acessorios',
    description: 'Teclado mecanico compacto com switches lineares e iluminacao branca para foco total.',
    price: 459.9,
    stock: 30,
    active: true,
  },
  {
    name: 'Mochila Executiva 22L',
    category: 'Utilidades',
    description: 'Mochila resistente a agua com compartimento dedicado para notebook de ate 15 polegadas.',
    price: 349,
    stock: 60,
    active: true,
  },
];

async function runSeed() {
  try {
    await connectDatabase();

    await User.deleteMany({});
    await Product.deleteMany({});

    const usersWithHash = await Promise.all(
      usersSeed.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(usersWithHash);
    await Product.insertMany(productsSeed);

    console.log('Seed executada com sucesso');
    console.log(`Ambiente: ${env.NODE_ENV}`);
    console.log('Usuarios criados: admin@loja.com | joao@cliente.com | mariana@cliente.com');
    console.log('Senha admin: Admin1234');
    console.log('Senha usuarios: Cliente123');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  }
}

runSeed();
