#!/bin/bash

echo "🔧 Fixing domain routing to show Node.js app instead of Flask app"

# Step 1: Check what's currently running
echo "=== Current containers ==="
docker ps

echo "=== What's using port 80 ==="
sudo ss -tlnp | grep :80 || echo "Port 80 not in use"

# Step 2: Stop any web servers that might be interfering
echo "=== Stopping interfering services ==="
sudo systemctl stop nginx 2>/dev/null || echo "nginx not running"
sudo systemctl stop apache2 2>/dev/null || echo "apache2 not running"
sudo systemctl disable nginx 2>/dev/null || echo "nginx not installed"
sudo systemctl disable apache2 2>/dev/null || echo "apache2 not installed"

# Step 3: Go to app directory and restart Docker Compose
echo "=== Starting Docker Compose stack ==="
cd /home/deployer/app

# Stop existing containers
docker-compose down

# Start the stack
docker-compose up -d

# Wait for services to start
sleep 10

# Step 4: Check if Caddy is running
echo "=== Checking Docker Compose status ==="
docker-compose ps

echo "=== Checking Caddy logs ==="
docker-compose logs caddy | tail -10

# Step 5: Test access
echo "=== Testing access ==="
echo "Testing Node.js direct access:"
curl -s -o /dev/null -w "Node.js (port 3000): %{http_code}\n" http://localhost:3000

echo "Testing domain through Caddy:"
curl -s -o /dev/null -w "Domain HTTP: %{http_code}\n" http://lkdevcontaineronline.online
curl -s -o /dev/null -w "Domain HTTPS: %{http_code}\n" https://lkdevcontaineronline.online

echo "=== Final container status ==="
docker ps

echo "✅ Fix complete! Your domain should now show the Node.js app"
echo "🌐 Visit: https://lkdevcontaineronline.online"