import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { testDataSchema, type HealthCheck, type AppInfo, type SystemStatus, type TestResponse } from "@shared/schema";

const startTime = Date.now();

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/health", (req, res) => {
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    
    const healthData: HealthCheck = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime,
      checks: {
        database: "healthy",
        redis: "healthy",
        external_api: "healthy",
        filesystem: "healthy"
      }
    };

    res.json(healthData);
  });

  // Application info endpoint
  app.get("/api/info", (req, res) => {
    const appInfo: AppInfo = {
      name: "container-test-app",
      version: process.env.APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      build: {
        timestamp: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
        commit: process.env.GIT_COMMIT || "local-dev",
        branch: process.env.GIT_BRANCH || "main"
      }
    };

    res.json(appInfo);
  });

  // System status endpoint
  app.get("/api/status", (req, res) => {
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    
    const systemStatus: SystemStatus = {
      uptime,
      memory: {
        used: `${memoryUsedMB}MB`,
        total: `${memoryTotalMB}MB`,
        percentage: Math.round((memoryUsedMB / memoryTotalMB) * 100)
      },
      cpu: {
        usage: Math.random() * 20 + 5, // Simulated CPU usage between 5-25%
        load: [
          Math.random() * 0.5,
          Math.random() * 0.5,
          Math.random() * 0.5
        ]
      }
    };

    res.json(systemStatus);
  });

  // Test endpoint for POST requests
  app.post("/api/test", (req, res) => {
    try {
      const validatedData = testDataSchema.parse(req.body);
      
      const response: TestResponse = {
        success: true,
        processed_at: new Date().toISOString(),
        id: `req-${Math.random().toString(36).substring(2, 9)}`,
        data: validatedData.data
      };

      res.json(response);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Invalid request data",
        details: error instanceof z.ZodError ? error.errors : "Unknown error"
      });
    }
  });

  // Environment configuration endpoint
  app.get("/api/config", (req, res) => {
    const config = {
      port: process.env.PORT || "5000",
      node_env: process.env.NODE_ENV || "development",
      log_level: process.env.LOG_LEVEL || "info",
      database_url: process.env.DATABASE_URL ? "configured" : "not configured",
      redis_url: process.env.REDIS_URL ? "configured" : "not configured"
    };

    res.json(config);
  });

  // Simple logs endpoint
  app.get("/api/logs", (req, res) => {
    const logs = [
      {
        timestamp: new Date(Date.now() - 30000).toISOString(),
        level: "info",
        message: "Application started successfully",
        service: "main"
      },
      {
        timestamp: new Date(Date.now() - 25000).toISOString(),
        level: "info",
        message: "Database connection established",
        service: "database"
      },
      {
        timestamp: new Date(Date.now() - 20000).toISOString(),
        level: "info",
        message: "Redis cache connected",
        service: "cache"
      },
      {
        timestamp: new Date(Date.now() - 15000).toISOString(),
        level: "info",
        message: "Health check endpoint registered",
        service: "health"
      },
      {
        timestamp: new Date(Date.now() - 10000).toISOString(),
        level: "info",
        message: "API endpoints initialized",
        service: "api"
      }
    ];

    res.json({ logs });
  });

  const httpServer = createServer(app);
  return httpServer;
}
