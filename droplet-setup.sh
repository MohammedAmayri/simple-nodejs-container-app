#!/bin/bash

# Digital Ocean Droplet Setup Script
# Run this on your Digital Ocean droplet to prepare it for GitHub Actions deployment

echo "🚀 Setting up Digital Ocean droplet for GitHub Actions deployment..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start and enable Docker
echo "▶️ Starting Docker service..."
systemctl start docker
systemctl enable docker

# Install additional useful tools
echo "🛠️ Installing additional tools..."
apt install -y curl wget git htop

# Configure firewall (optional but recommended)
echo "🔥 Configuring basic firewall..."
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable

# Clean up
rm -f get-docker.sh

echo ""
echo "✅ Droplet setup complete!"
echo ""
echo "Next steps:"
echo "1. Generate SSH key for GitHub Actions on your local machine:"
echo "   ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_key"
echo ""
echo "2. Copy the public key to this droplet:"
echo "   ssh-copy-id -i ~/.ssh/github_actions_key.pub root@$(curl -s ifconfig.me)"
echo ""
echo "3. Add these secrets to your GitHub repository:"
echo "   DO_HOST: $(curl -s ifconfig.me)"
echo "   DO_USERNAME: $(whoami)"
echo "   DO_SSH_KEY: (content of ~/.ssh/github_actions_key)"
echo "   DO_PORT: 22"
echo ""
echo "4. Push your code to GitHub and watch the magic happen!"
echo ""
echo "Your app will be accessible at: http://$(curl -s ifconfig.me)"