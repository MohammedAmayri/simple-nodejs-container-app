# Complete GitHub to Digital Ocean Deployment

## Step 1: Prepare Your Digital Ocean Droplet

### 1. Install Docker on your droplet
```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker service
systemctl start docker
systemctl enable docker

# Add user to docker group (if not using root)
usermod -aG docker $USER
```

### 2. Configure SSH Key for GitHub Actions
```bash
# On your local machine, generate SSH key for GitHub Actions
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_key

# Copy the public key to your droplet
ssh-copy-id -i ~/.ssh/github_actions_key.pub root@your-droplet-ip

# Keep the private key content - you'll need it for GitHub secrets
cat ~/.ssh/github_actions_key
```

## Step 2: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- **DO_HOST**: Your droplet IP address (e.g., `164.90.123.456`)
- **DO_USERNAME**: Your droplet username (usually `root`)
- **DO_SSH_KEY**: The entire private key content from `~/.ssh/github_actions_key`
- **DO_PORT**: SSH port (usually `22`)

## Step 3: Push to GitHub

### 1. Create a new repository on GitHub
- Go to https://github.com/new
- Name it something like `simple-nodejs-container-app`
- Make it public (for free GitHub Actions)
- Don't initialize with README (we already have files)

### 2. Add your files and push
```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Simple Node.js container app with Docker and GitHub Actions"

# Add your GitHub repository as origin (replace with your GitHub username/repo)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 4: Automatic Deployment

The GitHub Action will now automatically:

✅ **Test your Node.js app**
✅ **Build Docker image**
✅ **Test the Docker container**
✅ **Deploy to your Digital Ocean droplet**
✅ **Start the app on port 80**

## What Happens When You Push Code

1. **GitHub Actions triggers** on every push to main branch
2. **Tests run** - validates your Node.js app works
3. **Docker image builds** - creates container with your app
4. **Local testing** - verifies container works correctly
5. **Deploys to Digital Ocean** - automatically updates your droplet
6. **App goes live** - accessible at `http://your-droplet-ip`

## Deployment Process Details

The GitHub Action will:
- Stop any existing container on your droplet
- Transfer the new Docker image to your server
- Start the new container on port 80
- Verify the deployment was successful
- Clean up temporary files

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs for error details
2. Verify your Digital Ocean droplet is running
3. Ensure Docker is installed and running on droplet
4. Confirm SSH key has proper permissions
5. Check that port 80 is open on your droplet

### Test your deployment:
```bash
# SSH into your droplet and check
docker ps  # Should show your running container
curl http://localhost  # Should return your app
```

## Security Notes

- The app runs on port 80 (standard HTTP)
- Container restarts automatically if it crashes
- Old containers are cleaned up during deployment
- SSH keys are securely stored in GitHub secrets

Your app will be live at: `http://your-droplet-ip`