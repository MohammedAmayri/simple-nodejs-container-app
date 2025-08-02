import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  service: string;
}

export default function Logs() {
  const { data: logsData, isLoading } = useQuery<{ logs: LogEntry[] }>({
    queryKey: ["/api/logs"],
    refetchInterval: 10000,
  });

  const getLevelBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case "info":
        return <Badge className="bg-blue-100 text-blue-700">INFO</Badge>;
      case "warn":
        return <Badge className="bg-yellow-100 text-yellow-700">WARN</Badge>;
      case "error":
        return <Badge variant="destructive">ERROR</Badge>;
      default:
        return <Badge variant="outline">{level.toUpperCase()}</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Application Logs</h2>
        <p className="text-gray-600 text-lg">Recent application logs and system events.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            Recent Logs
            <Badge variant="outline" className="text-xs">
              Auto-refresh: 10s
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 flex-1" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {logsData?.logs.map((log, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="text-xs text-gray-500 min-w-[140px] font-mono">
                    {formatTimestamp(log.timestamp)}
                  </div>
                  <div className="min-w-[80px]">
                    {getLevelBadge(log.level)}
                  </div>
                  <div className="flex-1 text-sm text-gray-900">
                    {log.message}
                  </div>
                  <div className="text-xs text-gray-500 min-w-[80px]">
                    {log.service}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Levels Guide */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Log Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-100 text-blue-700">INFO</Badge>
              <span className="text-sm text-gray-600">General information</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-yellow-100 text-yellow-700">WARN</Badge>
              <span className="text-sm text-gray-600">Warning messages</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive">ERROR</Badge>
              <span className="text-sm text-gray-600">Error conditions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
