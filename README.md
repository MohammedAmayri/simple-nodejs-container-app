# Simple Node.js Container Test App

A lightweight Node.js web application designed for testing container hosting and GitHub deployment workflows.

## Quick Start

### Local Development
```bash
npm install
npm start
```

The app will start on `http://localhost:3000`

### Docker Deployment

#### Build the Docker image:
```bash
docker build -t simple-nodejs-app .
```

#### Run the container:
```bash
docker run -p 3000:3000 simple-nodejs-app
```

#### Or use Docker Compose (optional):
```bash
docker run -d -p 3000:3000 --name my-node-app simple-nodejs-app
```

## Features

- ✅ Minimal Node.js + Express.js setup
- ✅ Docker-ready with optimized Dockerfile
- ✅ Security best practices (non-root user)
- ✅ Perfect for CI/CD testing
- ✅ GitHub Actions compatible
- ✅ Container hosting ready

## GitHub Actions

This repository includes a GitHub Actions workflow that automatically:
- Tests the Node.js application
- Builds the Docker image
- Tests the container
- Validates the deployment

The workflow runs on every push to the main branch.

## Deployment

This app is ready for deployment on any container hosting platform:
- **Google Cloud Run** (recommended for serverless)
- **Railway** (GitHub integration)
- **Fly.io** (global edge deployment)
- **Docker Hub** + any platform
- Kubernetes
- AWS ECS/Fargate
- Azure Container Instances

See `deploy-instructions.md` for detailed deployment steps.

## License

MIT