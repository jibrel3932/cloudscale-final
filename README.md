# CloudScale - Final Project (Cloud Computing & DevOps Engineering)

**Author:** Jibrel Abubakr Jibrel — Student ID: 3932

A containerized web application deployed to **Azure Kubernetes Service (AKS)** using a full CI/CD pipeline. The image is stored in **Azure Container Registry (ACR)**, infrastructure is provisioned with **Terraform**, and deployment is automated with **GitHub Actions** including a **manual approval gate** for production.

## Architecture

```
Developer push (main)
        |
        v
GitHub Actions  --build & test-->  Docker image
        |                              |
        |                       push to ACR (Basic)
        |                              |
   manual approval gate               v
        |                     AKS pulls image (AcrPull, no secrets)
        v                              |
  Deploy to AKS  ----------->  Deployment (3 replicas) + Service (LoadBalancer)
                                       |
                                Public IP -> Browser
```

## Components

| Layer | Technology |
|-------|-----------|
| App | Node.js + Express, `/` page with custom name, `/health` endpoint |
| Container | Docker (`node:20-alpine`) |
| Registry | Azure Container Registry (Basic SKU) |
| Infra | Terraform (Resource Group, ACR, AKS 2x Standard_B2s) |
| Orchestration | Kubernetes — Deployment (3 replicas), Service (LoadBalancer), readiness + liveness probes on `/health` |
| CI/CD | GitHub Actions with manual approval gate (`production` environment) |

## Setup Instructions

### 1. Docker (local test)
```bash
docker build -t cloudscale-app:latest .
docker run -d -p 8080:80 cloudscale-app:latest
# open http://localhost:8080  and  http://localhost:8080/health
```

### 2. Terraform (provision Azure infra)
```bash
cd terraform
terraform init
terraform plan  -var="subscription_id=YOUR_SUB_ID"
terraform apply -var="subscription_id=YOUR_SUB_ID"
```

### 3. Push image to ACR
```bash
az acr login --name jibrelfinalacr3932
docker build -t jibrelfinalacr3932.azurecr.io/cloudscale-app:latest .
docker push jibrelfinalacr3932.azurecr.io/cloudscale-app:latest
```

### 4. Kubernetes (deploy to AKS)
```bash
az aks get-credentials --resource-group JibrelAbubakrJibrel-Final-rg --name JibrelAbubakrJibrel-Final-aks
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get nodes
kubectl get pods
kubectl get service cloudscale-service   # copy EXTERNAL-IP into browser
```

## GitHub Actions Workflow

`.github/workflows/ci-cd.yml` has three jobs:
1. **build-and-test** — runs on every push: installs deps, runs `test.js`, builds the Docker image.
2. **push-to-acr** — only on push to `main`: logs into Azure, builds and pushes the image to ACR.
3. **deploy-to-aks** — only on push to `main`, gated by the `production` environment (manual approval): pulls AKS credentials, updates the image tag, and applies the manifests.

### Required GitHub Secret
- `AZURE_CREDENTIALS` — output of:
  ```bash
  az ad sp create-for-rbac --name "cloudscale-ci" --role contributor \
    --scopes /subscriptions/YOUR_SUB_ID --sdk-auth
  ```

### Configure the approval gate
Repo **Settings > Environments > New environment > `production`** > add yourself as a **Required reviewer**.

## Cost & Cleanup
Estimated ~$16 over 10 days. **Always run `terraform destroy` when finished:**
```bash
cd terraform
terraform destroy -var="subscription_id=YOUR_SUB_ID"
```

## Repository
https://github.com/jibrel3932/cloudscale-final
