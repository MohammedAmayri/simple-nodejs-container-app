#!/bin/bash

echo "🚀 Starting both Node.js and Flask applications"

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down

# Remove any old containers with same names
docker rm -f simple-nodejs-app lk_dev_container caddy-proxy 2>/dev/null || true

# Start all services with docker-compose
echo "Starting all services..."
docker-compose up -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 15

# Check status
echo "=== Container Status ==="
docker-compose ps

echo "=== Running Containers ==="
docker ps

echo "=== Testing Applications ==="
echo "Node.js app (port 3000):"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000

echo "Flask app (port 8080):"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:8080

echo "Domain HTTPS:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" https://lkdevcontaineronline.online

echo "✅ Both applications should now be running!"
echo "🌐 Node.js: https://lkdevcontaineronline.online"
echo "🌶️  Flask: http://46.101.67.240:8080"