#!/bin/bash

# Digital Ocean Droplet Setup Script
# Run this on your Digital Ocean droplet to prepare it for GitHub Actions deployment

echo "🚀 Setting up Digital Ocean droplet for GitHub Actions deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Check if Docker is already installed
if command -v docker &> /dev/null; then
    echo "🐳 Docker is already installed: $(docker --version)"
    echo "▶️ Ensuring Docker service is running..."
    sudo systemctl start docker
    sudo systemctl enable docker
else
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    
    # Start and enable Docker
    echo "▶️ Starting Docker service..."
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Clean up
    rm -f get-docker.sh
fi

# Add current user to docker group
echo "👤 Adding $(whoami) to docker group..."
sudo usermod -aG docker $(whoami)

# Install additional useful tools
echo "🛠️ Installing additional tools..."
sudo apt install -y curl wget git htop

# Configure firewall (optional but recommended)
echo "🔥 Configuring basic firewall..."
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
echo "y" | sudo ufw enable

echo ""
echo "✅ Droplet setup complete!"
echo ""
echo "⚠️  IMPORTANT: Log out and SSH back in for docker group changes to take effect!"
echo "   Or run: newgrp docker"
echo ""
echo "Next steps:"
echo "1. Test Docker works: docker run hello-world"
echo ""
echo "2. On your LOCAL machine, generate SSH key for GitHub Actions:"
echo "   ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_key"
echo ""
echo "3. Copy the public key to this droplet:"
echo "   ssh-copy-id -i ~/.ssh/github_actions_key.pub $(whoami)@$(curl -s ifconfig.me)"
echo ""
echo "4. Add these secrets to your GitHub repository (Settings → Secrets):"
echo "   DO_HOST: $(curl -s ifconfig.me)"
echo "   DO_USERNAME: $(whoami)"
echo "   DO_SSH_KEY: (content of ~/.ssh/github_actions_key private key)"
echo "   DO_PORT: 22"
echo ""
echo "5. Push your code to GitHub and automatic deployment will start!"
echo ""
echo "Your app will be accessible at: http://$(curl -s ifconfig.me)"