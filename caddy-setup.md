# SSL Setup with Caddy + Docker Compose

## What is Docker Compose Good For?

Docker Compose helps you:
- **Manage multiple containers** as a single application
- **Define services** in a simple YAML file
- **Handle networking** between containers automatically
- **Manage volumes** and environment variables
- **Scale services** easily
- **Ensure containers start in correct order**

## Benefits of This Setup

### Caddy Reverse Proxy
- **Automatic SSL certificates** from Let's Encrypt
- **Automatic renewals** - no manual certificate management
- **HTTP to HTTPS redirects** built-in
- **Security headers** automatically added
- **Gzip compression** for better performance

### Docker Compose Benefits
- **Single command** to start all services: `docker-compose up -d`
- **Service discovery** - containers can talk to each other by name
- **Automatic restarts** if containers crash
- **Easy updates** and rollbacks
- **Environment management** between dev/staging/production

## Setup Instructions

### 1. Point Your Domain to Droplet (Required for SSL)
If you have a domain:
```bash
# Add A record in your domain DNS:
# YOUR_DOMAIN.com -> YOUR_DROPLET_IP
```

### 2. Update Caddyfile
Edit `Caddyfile` and replace `YOUR_DOMAIN.com` with your actual domain:
```
yourdomain.com {
    reverse_proxy nodejs-app:3000
    # ... rest stays the same
}
```

### 3. Deploy with Docker Compose
On your droplet:
```bash
# Stop existing containers
docker stop simple-nodejs-app caddy-proxy || true
docker rm simple-nodejs-app caddy-proxy || true

# Start the new stack
docker-compose up -d

# Check everything is running
docker-compose ps
```

### 4. Update GitHub Actions
The workflow will automatically use Docker Compose for deployments.

## What This Gives You

✅ **Automatic HTTPS** - Let's Encrypt certificates  
✅ **Security headers** - XSS protection, HSTS, etc.  
✅ **Performance** - Gzip compression  
✅ **Reliability** - Auto-restart containers  
✅ **Scalability** - Easy to add more services  
✅ **Monitoring** - Centralized logging  

## Access Your App

- **HTTPS**: `https://yourdomain.com`
- **HTTP**: Automatically redirects to HTTPS
- **Your Flask app**: Can add to docker-compose.yml later

## No Domain? Use IP + Self-Signed

If you don't have a domain, modify Caddyfile:
```
:80 {
    reverse_proxy nodejs-app:3000
}
```

This gives you container management benefits without SSL.