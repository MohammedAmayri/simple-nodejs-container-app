import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { HealthCheck, AppInfo, SystemStatus } from "@shared/schema";

export default function Home() {
  const { data: healthData, isLoading: healthLoading } = useQuery<HealthCheck>({
    queryKey: ["/health"],
    refetchInterval: 30000,
  });

  const { data: infoData, isLoading: infoLoading } = useQuery<AppInfo>({
    queryKey: ["/api/info"],
  });

  const { data: statusData, isLoading: statusLoading } = useQuery<SystemStatus>({
    queryKey: ["/api/status"],
    refetchInterval: 10000,
  });

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Container Test Application</h2>
        <p className="text-gray-600 text-lg">Lightweight web application designed for container hosting tests and GitHub Actions deployment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Application Status</CardTitle>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {healthLoading || statusLoading ? (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="font-medium">{statusData ? formatUptime(statusData.uptime) : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">{infoData?.version || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Environment:</span>
                    <span className="font-medium">{infoData?.environment || 'N/A'}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Health Check Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Health Checks</CardTitle>
            <i className="fas fa-heartbeat text-green-500"></i>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {healthLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <i className="fas fa-check-circle mr-1"></i>
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Redis</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <i className="fas fa-check-circle mr-1"></i>
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">External API</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <i className="fas fa-check-circle mr-1"></i>
                      Healthy
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Container Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Container Info</CardTitle>
            <i className="fab fa-docker text-blue-600"></i>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {statusLoading ? (
                <>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Port:</span>
                    <span className="font-medium font-mono">5000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Memory:</span>
                    <span className="font-medium">{statusData?.memory.used || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CPU:</span>
                    <span className="font-medium">{statusData ? `${statusData.cpu.usage.toFixed(1)}%` : 'N/A'}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <i className="fas fa-route text-blue-600"></i>
              <span className="text-gray-600">Basic routing with multiple pages</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-heartbeat text-green-500"></i>
              <span className="text-gray-600">Health check endpoint</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-server text-purple-600"></i>
              <span className="text-gray-600">Static content serving</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-code text-yellow-600"></i>
              <span className="text-gray-600">REST API endpoints</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fas fa-cog text-gray-600"></i>
              <span className="text-gray-600">Environment configuration</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fab fa-github text-gray-900"></i>
              <span className="text-gray-600">GitHub Actions compatible</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-md p-4 font-mono text-sm">
            <div className="text-gray-600 mb-2"># Clone and run locally</div>
            <div className="text-gray-900">git clone https://github.com/username/container-test-app.git</div>
            <div className="text-gray-900">cd container-test-app</div>
            <div className="text-gray-900">docker build -t container-test-app .</div>
            <div className="text-gray-900">docker run -p 5000:5000 container-test-app</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
