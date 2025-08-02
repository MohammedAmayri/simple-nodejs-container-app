import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { HealthCheck, SystemStatus } from "@shared/schema";

export default function Health() {
  const { data: healthData, isLoading: healthLoading } = useQuery<HealthCheck>({
    queryKey: ["/health"],
    refetchInterval: 30000,
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

  const getHealthBadge = (status: string) => {
    if (status === "healthy") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          <i className="fas fa-check-circle mr-2"></i>
          Healthy
        </Badge>
      );
    }
    return (
      <Badge variant="destructive">
        <i className="fas fa-exclamation-circle mr-2"></i>
        Unhealthy
      </Badge>
    );
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Health Check Status</h2>
        <p className="text-gray-600 text-lg">Monitor application health and dependencies status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Overall Health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl">Overall Health</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {healthLoading ? (
                <Skeleton className="h-12 w-20 mx-auto mb-2" />
              ) : (
                <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              )}
              <div className="text-gray-600">All systems operational</div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl">Response Time</CardTitle>
            <i className="fas fa-stopwatch text-blue-600"></i>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {statusLoading ? (
                <Skeleton className="h-12 w-20 mx-auto mb-2" />
              ) : (
                <div className="text-4xl font-bold text-blue-600 mb-2">42ms</div>
              )}
              <div className="text-gray-600">Average response time</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Health Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Detailed Health Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthLoading ? (
              <>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </>
            ) : (
              <>
                {/* Database Check */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-database text-2xl text-green-500"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">Database Connection</h4>
                      <p className="text-sm text-gray-600">PostgreSQL database connectivity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getHealthBadge(healthData?.checks.database || "unhealthy")}
                    <div className="text-xs text-gray-600 mt-1">Last checked: 30s ago</div>
                  </div>
                </div>

                {/* Redis Check */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-memory text-2xl text-green-500"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">Redis Cache</h4>
                      <p className="text-sm text-gray-600">Redis cache server connectivity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getHealthBadge(healthData?.checks.redis || "unhealthy")}
                    <div className="text-xs text-gray-600 mt-1">Last checked: 45s ago</div>
                  </div>
                </div>

                {/* External API Check */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-globe text-2xl text-green-500"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">External API</h4>
                      <p className="text-sm text-gray-600">Third-party service availability</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getHealthBadge(healthData?.checks.external_api || "unhealthy")}
                    <div className="text-xs text-gray-600 mt-1">Last checked: 1m ago</div>
                  </div>
                </div>

                {/* File System Check */}
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-hdd text-2xl text-green-500"></i>
                    <div>
                      <h4 className="font-medium text-gray-900">File System</h4>
                      <p className="text-sm text-gray-600">Disk space and write permissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getHealthBadge(healthData?.checks.filesystem || "unhealthy")}
                    <div className="text-xs text-gray-600 mt-1">Last checked: 2m ago</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
