import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ApiEndpoints() {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  const testEndpoint = useMutation({
    mutationFn: async (endpoint: string) => {
      if (endpoint === "/api/test") {
        const testData = {
          data: "test payload",
          timestamp: new Date().toISOString(),
          source: "client-app"
        };
        const response = await apiRequest("POST", endpoint, testData);
        return response.json();
      } else {
        const response = await apiRequest("GET", endpoint);
        return response.json();
      }
    },
    onSuccess: (data, endpoint) => {
      setTestResults(prev => ({ ...prev, [endpoint]: data }));
      toast({
        title: "Success",
        description: `${endpoint} endpoint tested successfully`,
      });
    },
    onError: (error: any, endpoint) => {
      toast({
        title: "Error",
        description: `Failed to test ${endpoint}: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const endpoints = [
    {
      method: "GET",
      path: "/health",
      description: "Returns the health status of the application and its dependencies.",
      example: {
        status: "healthy",
        timestamp: "2024-01-15T10:30:00Z",
        uptime: 9360,
        checks: {
          database: "healthy",
          redis: "healthy",
          external_api: "healthy"
        }
      },
      codes: [
        { code: "200", description: "All systems healthy" },
        { code: "503", description: "One or more services unhealthy" }
      ]
    },
    {
      method: "GET",
      path: "/api/info",
      description: "Returns application information including version, environment, and build details.",
      example: {
        name: "container-test-app",
        version: "1.0.0",
        environment: "production",
        build: {
          timestamp: "2024-01-15T08:00:00Z",
          commit: "abc123def456",
          branch: "main"
        }
      }
    },
    {
      method: "GET",
      path: "/api/status",
      description: "Returns detailed system status including resource usage and performance metrics.",
      example: {
        uptime: 9360,
        memory: {
          used: "124MB",
          total: "512MB",
          percentage: 24.2
        },
        cpu: {
          usage: 12.5,
          load: [0.1, 0.15, 0.08]
        }
      }
    },
    {
      method: "POST",
      path: "/api/test",
      description: "Accepts test data and returns processed response for integration testing.",
      example: {
        success: true,
        processed_at: "2024-01-15T10:30:01Z",
        id: "req-abc123",
        data: "test payload"
      },
      requestBody: {
        data: "test payload",
        timestamp: "2024-01-15T10:30:00Z",
        source: "client-app"
      }
    }
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">API Endpoints</h2>
        <p className="text-gray-600 text-lg">Available REST API endpoints for testing and integration.</p>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant={endpoint.method === "GET" ? "secondary" : "default"} 
                         className={endpoint.method === "GET" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                    {endpoint.method}
                  </Badge>
                  <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                </div>
                <Button
                  onClick={() => testEndpoint.mutate(endpoint.path)}
                  disabled={testEndpoint.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {testEndpoint.isPending && testEndpoint.variables === endpoint.path ? "Testing..." : "Test Endpoint"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{endpoint.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {endpoint.requestBody && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Request Body</h4>
                    <div className="bg-gray-50 rounded-md p-3 text-sm font-mono">
                      <pre className="text-gray-900">
                        {JSON.stringify(endpoint.requestBody, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    {testResults[endpoint.path] ? "Test Result" : "Response Example"}
                  </h4>
                  <div className="bg-gray-50 rounded-md p-3 text-sm font-mono">
                    <pre className="text-gray-900">
                      {JSON.stringify(testResults[endpoint.path] || endpoint.example, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              {endpoint.codes && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Response Codes</h4>
                  <div className="space-y-1">
                    {endpoint.codes.map((code, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className={code.code === "200" ? "text-green-600" : "text-yellow-600"}>
                          {code.code}
                        </span>
                        <span className="text-gray-600">{code.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
