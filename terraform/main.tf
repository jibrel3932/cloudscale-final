# Resource Group - name includes student name
resource "azurerm_resource_group" "rg" {
  name     = "${var.student_name}-Final-rg"
  location = var.location

  tags = {
    Project     = "Final"
    StudentName = var.student_name
  }
}

# Azure Container Registry (Basic SKU)
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = false

  tags = {
    Project     = "Final"
    StudentName = var.student_name
  }
}

# Azure Kubernetes Service (2 nodes, Standard_B2s)
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.student_name}-Final-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "jibrelfinal"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Project     = "Final"
    StudentName = var.student_name
  }
}

# AKS + ACR integration - grant AKS kubelet identity AcrPull (no secrets, automatic image pull)
resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                            = azurerm_container_registry.acr.id
  role_definition_name             = "AcrPull"
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  skip_service_principal_aad_check = true
}
