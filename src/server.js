const app = require('./app');
const env = require('./config/env');
const { connectDatabase } = require('./config/database');

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`API rodando na porta ${env.PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar a API:', error);
    process.exit(1);
  }
}

bootstrap();
