# VK-Paints User Service

## Description
The User Service handles identity management, authentication, and user profiles for the VK-Paints platform.

## Tech Stack
- Node.js & Express
- PostgreSQL & Sequelize
- JWT Authentication
- prom-client (Metrics)

## Project Structure
- src/controllers: Request logic
- src/models: Database schemas
- src/config: DB, metrics, and auth configuration
- index.js: Entry point

## Environment Variables
- PORT: Service port (default 3001)
- DB_URL: PostgreSQL connection string
- JWT_SECRET: Secret for token signing
- ADMIN_EMAIL: Initial admin account email

## Setup & Installation
`ash
npm install
`

## Running the Application
`ash
npm start
`

## Docker Instructions
`ash
docker build -t vkpaints-user-service .
docker run -p 3001:3001 --env-file .env vkpaints-user-service
`

## Kubernetes Deployment
Deployed via ArgoCD using Helm charts located in the kpaints-helm-charts repository.

## CI/CD Pipeline
- **Validation**: Runs on every PR to main (Build & Scan)
- **Deployment**: Triggered by GitHub Release (Image push & Helm update)

## API Endpoints
- GET /health: Health status
- GET /metrics: Prometheus metrics
- POST /api/users/register: User registration
- POST /api/users/login: Authentication

## Monitoring
Metrics are exposed on /metrics for Prometheus scraping.
