#!/bin/bash

echo "🔍 Complete Deployment Verification Script"
echo "=========================================="

# Check GitHub Actions status
echo "1. GitHub Actions Status:"
echo "   Visit: https://github.com/MohammedAmayri/simple-nodejs-container-app/actions"
echo "   Expected: Latest workflow should be successful (green checkmark)"
echo ""

# Check droplet containers
echo "2. Droplet Container Status:"
echo "   Run these commands on your droplet:"
echo "   ssh deployer@46.101.67.240"
echo ""
echo "   # Check all running containers"
echo "   docker ps"
echo "   # Expected: caddy-proxy on ports 80/443, simple-nodejs-app on port 3000"
echo ""
echo "   # Check Docker Compose status"
echo "   cd /home/deployer/app"
echo "   docker-compose ps"
echo "   # Expected: Both services Up and running"
echo ""

# Check application access
echo "3. Application Access Tests:"
echo "   Run on droplet:"
echo ""
echo "   # Test Node.js app directly"
echo "   curl -s http://localhost:3000 | grep 'Welcome to your Node.js app'"
echo "   # Expected: Should return HTML with welcome message"
echo ""
echo "   # Test domain HTTP (should redirect to HTTPS)"
echo "   curl -I http://lkdevcontaineronline.online"
echo "   # Expected: 301 redirect to HTTPS"
echo ""
echo "   # Test domain HTTPS"
echo "   curl -s https://lkdevcontaineronline.online | grep 'Welcome to your Node.js app'"
echo "   # Expected: Node.js app content, NOT Flask app"
echo ""

# Check SSL certificate
echo "4. SSL Certificate Verification:"
echo "   # Check SSL certificate details"
echo "   openssl s_client -connect lkdevcontaineronline.online:443 -servername lkdevcontaineronline.online < /dev/null 2>/dev/null | openssl x509 -noout -dates"
echo "   # Expected: Valid Let's Encrypt certificate with future expiry date"
echo ""

# Check logs for any issues
echo "5. Container Logs:"
echo "   cd /home/deployer/app"
echo "   docker-compose logs caddy | tail -10"
echo "   docker-compose logs nodejs-app | tail -10"
echo "   # Expected: No error messages, successful startup logs"
echo ""

# Final browser test
echo "6. Browser Verification:"
echo "   🌐 Open: https://lkdevcontaineronline.online"
echo "   Expected: See Node.js welcome page with:"
echo "   - Title: 'Hello! Welcome to your Node.js app'"
echo "   - Green padlock (valid SSL)"
echo "   - NOT the Flask Restaurant Menu Scraper"
echo ""

echo "✅ SUCCESS CRITERIA:"
echo "   ✓ GitHub Actions workflow completed successfully"
echo "   ✓ Caddy container running on ports 80/443"
echo "   ✓ Node.js container running on port 3000"
echo "   ✓ Domain redirects HTTP → HTTPS"
echo "   ✓ HTTPS shows Node.js app (not Flask app)"
echo "   ✓ Valid SSL certificate from Let's Encrypt"
echo "   ✓ Both apps coexist (Flask on port 8080, Node.js on domain)"

echo ""
echo "🚨 IF SOMETHING FAILS:"
echo "   1. Check GitHub Actions logs for build errors"
echo "   2. Run: docker-compose down && docker-compose up -d"
echo "   3. Check container logs for startup issues"
echo "   4. Verify Caddy configuration files exist in /home/deployer/app/"