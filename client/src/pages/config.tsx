import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Config() {
  const { data: configData, isLoading } = useQuery({
    queryKey: ["/api/config"],
  });

  const getStatusBadge = (value: string) => {
    if (value === "configured") {
      return <Badge className="bg-green-100 text-green-700">Configured</Badge>;
    }
    return <Badge variant="secondary">Not Configured</Badge>;
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Configuration</h2>
        <p className="text-gray-600 text-lg">Environment variables and application configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Application Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Port</span>
                    <code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                      {configData?.port || 'N/A'}
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Environment</span>
                    <Badge variant="outline">{configData?.node_env || 'N/A'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Log Level</span>
                    <Badge variant="outline">{configData?.log_level || 'N/A'}</Badge>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* External Services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">External Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Database URL</span>
                    {getStatusBadge(configData?.database_url || "not configured")}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Redis URL</span>
                    {getStatusBadge(configData?.redis_url || "not configured")}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment Variables Guide */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Configure the application using the following environment variables:
          </p>
          
          <div className="bg-gray-50 rounded-md p-4 font-mono text-sm">
            <div className="space-y-2">
              <div><span className="text-blue-600">PORT</span>=5000</div>
              <div><span className="text-blue-600">NODE_ENV</span>=production</div>
              <div><span className="text-blue-600">LOG_LEVEL</span>=info</div>
              <div><span className="text-blue-600">DATABASE_URL</span>=postgresql://...</div>
              <div><span className="text-blue-600">REDIS_URL</span>=redis://...</div>
              <div><span className="text-blue-600">APP_VERSION</span>=1.0.0</div>
              <div><span className="text-blue-600">BUILD_TIMESTAMP</span>=2024-01-15T08:00:00Z</div>
              <div><span className="text-blue-600">GIT_COMMIT</span>=abc123def456</div>
              <div><span className="text-blue-600">GIT_BRANCH</span>=main</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
