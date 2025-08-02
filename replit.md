# Simple Node.js Container Test Application

## Overview

This is a simple Node.js web application designed specifically for testing container hosting and GitHub deployment workflows. The application provides a basic welcome page and serves as a lightweight testing tool for container orchestration, CI/CD pipelines, and deployment validation. Perfect for quick deployment tests without complex dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Simple Node.js Application
The application is built with a minimal Node.js and Express.js setup:
- **Framework**: Express.js with TypeScript for simple HTTP server functionality
- **Routing**: Single route serving the homepage with HTML response
- **Styling**: Inline CSS for basic styling and responsive design
- **Deployment Ready**: Configured to run on port 5000 with proper host binding for container environments

### Key Features
- **Welcome Page**: Simple greeting page with clean, professional styling
- **Container Ready**: Configured with proper port binding (0.0.0.0) for container deployment
- **GitHub Actions Compatible**: Minimal dependencies make it perfect for CI/CD testing
- **Lightweight**: No complex dependencies, databases, or frontend frameworks

## Project Structure

The project now has a minimal, clean structure with only essential files:

```
├── index.js          # Main application file
├── package.json      # Project configuration and dependencies
├── package-lock.json # Locked dependency versions
├── node_modules/     # Express.js and its dependencies (69 packages total)
└── replit.md         # Project documentation
```

## Dependencies

### Core Dependencies
- **Express.js**: Lightweight web framework for Node.js (only dependency)

### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Node.js**: Runtime environment with minimal dependencies for fast startup