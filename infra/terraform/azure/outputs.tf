output "resource_group_name" {
  description = "Resource group criado"
  value       = azurerm_resource_group.main.name
}

output "container_registry_name" {
  description = "Nome do Azure Container Registry"
  value       = azurerm_container_registry.main.name
}

output "container_registry_login_server" {
  description = "Login server do ACR"
  value       = azurerm_container_registry.main.login_server
}

output "web_app_name" {
  description = "Nome do App Service"
  value       = azurerm_linux_web_app.main.name
}

output "web_app_url" {
  description = "URL publica da API"
  value       = "https://${azurerm_linux_web_app.main.default_hostname}"
}
