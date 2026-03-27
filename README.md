# API Injection Test

API basica em Node.js com:

- Express
- MongoDB (Mongoose)
- Validacao com Zod
- Seed com dados simulando cenario real
- Autenticacao basica com JWT

## Requisitos

- Node.js 18+
- MongoDB local ou remoto

## Instalacao

```bash
npm install
```

## Variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto usando `.env.example` como base.

Exemplo:

```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/api_injection_test
JWT_SECRET=troque_este_segredo
JWT_EXPIRES_IN=1d
```

## Rodar em desenvolvimento

```bash
npm run dev
```

## Front-end simples

Um cliente web estatico foi adicionado para testar a API.

1. Inicie a API com `npm run dev`.
2. Abra no navegador: `http://localhost:3000`.
3. Faça login com um usuario da seed para testar:
	- `admin@loja.com` / `Admin1234` (admin)
	- `joao@cliente.com` / `Cliente123` (user)

No painel, voce pode:

- Fazer login e registro
- Listar produtos
- Criar/editar/remover produtos se estiver autenticado como admin

## Rodar seed

```bash
npm run seed
```

Isso vai limpar e popular o banco com usuarios e produtos.

Usuarios criados pela seed:

- `admin@loja.com` / `Admin1234` (admin)
- `joao@cliente.com` / `Cliente123` (user)
- `mariana@cliente.com` / `Cliente123` (user)

## Endpoints

Base URL: `http://localhost:3000`

### Health

- `GET /health`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requer token)

Exemplo de login:

```json
{
	"email": "admin@loja.com",
	"password": "Admin1234"
}
```

Use o token retornado no header:

```text
Authorization: Bearer SEU_TOKEN
```

### Produtos

- `GET /api/products` (publico)
- `GET /api/products/:id` (publico)
- `POST /api/products` (admin)
- `PATCH /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

## Estrutura

```text
src/
	app.js
	server.js
	config/
	middlewares/
	models/
	routes/
	schemas/
	scripts/
	utils/
```

## Deploy no Azure com Terraform

Foi adicionada uma estrutura Terraform para subir a API em Azure App Service com container Docker.

- Pasta: `infra/terraform/azure`
- Guia completo: `infra/terraform/azure/README.md`

Resumo rapido:

1. Criar `terraform.tfvars` a partir de `terraform.tfvars.example`
2. Executar `terraform init && terraform apply`
3. Buildar e publicar a imagem no ACR criado
4. Acessar a URL gerada no output `web_app_url`