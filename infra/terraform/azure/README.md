# Deploy da API no Azure com Terraform

Este diretório cria:

- Resource Group
- Azure Container Registry (ACR)
- App Service Plan Linux
- Linux Web App com imagem Docker da API

## Pre-requisitos

- Terraform >= 1.5
- Azure CLI autenticado (`az login`)
- Docker instalado

## 1) Preparar variaveis

Copie o arquivo de exemplo:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edite `terraform.tfvars` com os valores reais (`subscription_id`, `mongo_uri`, `jwt_secret`).

## 2) Criar infraestrutura

```bash
terraform init
terraform plan
terraform apply
```

Ao final, capture os outputs:

- `container_registry_name`
- `container_registry_login_server`
- `web_app_name`

## 3) Build e push da imagem para o ACR

No diretorio raiz do projeto (`api-injection-test`):

```bash
az acr login --name <container_registry_name>
docker build -t <container_registry_login_server>/api-injection-test:v1 .
docker push <container_registry_login_server>/api-injection-test:v1
```

## 4) Atualizar App Service para nova tag (quando necessario)

- Atualize `container_image_tag` em `terraform.tfvars`
- Rode novamente:

```bash
terraform apply
```

## 5) Teste da API em nuvem

Use a URL do output `web_app_url`:

```bash
curl https://<seu-app>.azurewebsites.net/health
```

Resposta esperada:

```json
{"status":"ok"}
```
