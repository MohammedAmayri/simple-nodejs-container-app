# Container Test Application

## Overview

This is a full-stack web application designed specifically for testing container hosting and deployment workflows. The application features a React frontend with monitoring capabilities and an Express.js backend that provides health checks, system metrics, and API endpoints for testing purposes. It's built to serve as a lightweight testing tool for container orchestration, CI/CD pipelines, and deployment validation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18 and TypeScript, utilizing a modern component-based architecture:
- **UI Framework**: Implements shadcn/ui components with Radix UI primitives for accessibility and consistency
- **Styling**: Uses Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a clean separation of concerns with dedicated directories for components, pages, hooks, and utilities. The layout uses a sidebar navigation pattern with pages for health monitoring, API testing, configuration viewing, logs, and system monitoring.

### Backend Architecture
The server-side uses Express.js with TypeScript in a modular structure:
- **Framework**: Express.js with middleware for JSON parsing, logging, and error handling
- **Development Setup**: Integrated Vite development server for hot reload during development
- **API Design**: RESTful endpoints organized by functionality (health, info, status)
- **Data Storage**: In-memory storage implementation with interface-based abstraction for future database integration
- **Request Logging**: Custom middleware for API request/response logging with duration tracking

### Data Storage Solutions
Currently implements an in-memory storage pattern with a clean interface abstraction:
- **Storage Interface**: Defines CRUD operations for user management
- **Memory Implementation**: Temporary storage using Map structures for development and testing
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions in shared directory
- **Migration Support**: Drizzle-kit setup for database schema migrations

### Authentication and Authorization
The application structure suggests authentication capabilities:
- **User Schema**: Defined user and insert user types in shared schema
- **Storage Methods**: User retrieval by ID and username, user creation functionality
- **Session Ready**: Express session configuration prepared for PostgreSQL session store

## External Dependencies

### Database Integration
- **Drizzle ORM**: Modern TypeScript ORM for database operations
- **Neon Database**: Serverless PostgreSQL database service integration
- **Connection Pooling**: Configured for serverless PostgreSQL connections

### UI and Styling
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Fast build tool with TypeScript support and React plugin
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

### Frontend Libraries
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date utility library for formatting and manipulation
- **Wouter**: Lightweight routing library

### Development Environment
- **Replit Integration**: Configured for Replit development environment with error overlay
- **TypeScript**: Full TypeScript support across client, server, and shared code
- **Path Aliases**: Configured import aliases for clean code organization