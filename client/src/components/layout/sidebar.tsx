import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: "fas fa-home" },
  { name: "Health Check", href: "/health", icon: "fas fa-heartbeat" },
  { name: "API Endpoints", href: "/api", icon: "fas fa-code" },
  { name: "Configuration", href: "/config", icon: "fas fa-cog" },
  { name: "Logs", href: "/logs", icon: "fas fa-list-alt" },
  { name: "Monitoring", href: "/monitoring", icon: "fas fa-chart-line" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
