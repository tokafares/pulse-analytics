import { Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Avatar } from "../ui/Avatar";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu size={20} aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            P
          </div>
          <span className="hidden text-base font-semibold text-slate-900 dark:text-white sm:inline">
            Pulse Analytics
          </span>
        </div>
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? (
            <Sun size={18} aria-hidden />
          ) : (
            <Moon size={18} aria-hidden />
          )}
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <Avatar name={user.name} color={user.avatarColor} size={32} />
            <div className="hidden text-sm sm:block">
              <p className="font-medium text-slate-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400">{user.role}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
