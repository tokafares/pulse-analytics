import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, Users } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
          P
        </div>
        <span className="text-lg font-semibold text-slate-900 dark:text-white">
          Pulse Analytics
        </span>
      </div>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`
            }
          >
            <Icon size={18} aria-hidden />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
