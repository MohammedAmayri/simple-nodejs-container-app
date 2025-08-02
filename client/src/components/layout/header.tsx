import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const [isOnline, setIsOnline] = useState(true);

  const { data: healthData } = useQuery({
    queryKey: ["/health"],
    refetchInterval: 30000, // Check every 30 seconds
  });

  useEffect(() => {
    setIsOnline(healthData?.status === "healthy");
  }, [healthData]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fab fa-docker text-2xl text-blue-600"></i>
              <h1 className="text-xl font-semibold text-gray-900">Container Test App</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <a href="https://github.com" className="text-gray-600 hover:text-gray-900 transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
