const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string().min(1, 'MONGO_URI obrigatorio'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET deve ter pelo menos 8 caracteres'),
  JWT_EXPIRES_IN: z.string().default('1d'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Erro nas variaveis de ambiente:');
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

module.exports = parsedEnv.data;
