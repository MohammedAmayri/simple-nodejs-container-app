import { z } from "zod";

export const healthCheckSchema = z.object({
  status: z.enum(["healthy", "unhealthy", "degraded"]),
  timestamp: z.string(),
  uptime: z.number(),
  checks: z.object({
    database: z.enum(["healthy", "unhealthy"]),
    redis: z.enum(["healthy", "unhealthy"]),
    external_api: z.enum(["healthy", "unhealthy"]),
    filesystem: z.enum(["healthy", "unhealthy"])
  })
});

export const appInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
  environment: z.string(),
  build: z.object({
    timestamp: z.string(),
    commit: z.string(),
    branch: z.string()
  })
});

export const systemStatusSchema = z.object({
  uptime: z.number(),
  memory: z.object({
    used: z.string(),
    total: z.string(),
    percentage: z.number()
  }),
  cpu: z.object({
    usage: z.number(),
    load: z.array(z.number())
  })
});

export const testDataSchema = z.object({
  data: z.string(),
  timestamp: z.string(),
  source: z.string()
});

export const testResponseSchema = z.object({
  success: z.boolean(),
  processed_at: z.string(),
  id: z.string(),
  data: z.string()
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;
export type AppInfo = z.infer<typeof appInfoSchema>;
export type SystemStatus = z.infer<typeof systemStatusSchema>;
export type TestData = z.infer<typeof testDataSchema>;
export type TestResponse = z.infer<typeof testResponseSchema>;
