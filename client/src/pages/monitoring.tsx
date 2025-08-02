import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { SystemStatus } from "@shared/schema";

export default function Monitoring() {
  const { data: statusData, isLoading } = useQuery<SystemStatus>({
    queryKey: ["/api/status"],
    refetchInterval: 5000,
  });

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">System Monitoring</h2>
        <p className="text-gray-600 text-lg">Real-time system performance metrics and resource usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Uptime */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <i className="fas fa-clock text-blue-600"></i>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{statusData ? formatUptime(statusData.uptime) : 'N/A'}</div>
            )}
            <p className="text-xs text-gray-600">Since last restart</p>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <i className="fas fa-memory text-green-600"></i>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{statusData?.memory.used || 'N/A'}</div>
                <Progress value={statusData?.memory.percentage || 0} className="mt-2" />
              </>
            )}
            <p className="text-xs text-gray-600">
              {statusData ? `${statusData.memory.percentage}% of ${statusData.memory.total}` : 'Memory usage'}
            </p>
          </CardContent>
        </Card>

        {/* CPU Usage */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <i className="fas fa-microchip text-purple-600"></i>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{statusData ? `${statusData.cpu.usage.toFixed(1)}%` : 'N/A'}</div>
                <Progress value={statusData?.cpu.usage || 0} className="mt-2" />
              </>
            )}
            <p className="text-xs text-gray-600">Current CPU utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Load */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">System Load Average</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">1 minute</span>
                  <span className="font-mono text-lg">{statusData?.cpu.load[0].toFixed(2) || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">5 minutes</span>
                  <span className="font-mono text-lg">{statusData?.cpu.load[1].toFixed(2) || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">15 minutes</span>
                  <span className="font-mono text-lg">{statusData?.cpu.load[2].toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response Time</span>
                <span className="font-mono text-lg text-green-600">42ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Requests/min</span>
                <span className="font-mono text-lg">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Error Rate</span>
                <span className="font-mono text-lg text-green-600">0.02%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">System Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-600">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Active Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Stable</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
