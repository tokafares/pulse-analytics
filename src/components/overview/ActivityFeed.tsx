import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  UserPlus,
  UserX,
  type LucideIcon,
} from "lucide-react";
import type { ActivityItem, ActivityType } from "../../types";
import { formatRelativeTime } from "../../lib/format";
import { Card } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";

const TYPE_CONFIG: Record<
  ActivityType,
  { icon: LucideIcon; bg: string; fg: string }
> = {
  signup: {
    icon: UserPlus,
    bg: "bg-indigo-100 dark:bg-indigo-500/15",
    fg: "text-indigo-600 dark:text-indigo-400",
  },
  upgrade: {
    icon: ArrowUpCircle,
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    fg: "text-emerald-600 dark:text-emerald-400",
  },
  downgrade: {
    icon: ArrowDownCircle,
    bg: "bg-amber-100 dark:bg-amber-500/15",
    fg: "text-amber-600 dark:text-amber-400",
  },
  churn: {
    icon: UserX,
    bg: "bg-rose-100 dark:bg-rose-500/15",
    fg: "text-rose-600 dark:text-rose-400",
  },
  payment: {
    icon: CreditCard,
    bg: "bg-sky-100 dark:bg-sky-500/15",
    fg: "text-sky-600 dark:text-sky-400",
  },
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="col-span-full">
        <EmptyState
          title="No recent activity"
          description="New signups, upgrades, and payments will show up here."
        />
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Recent activity
      </h3>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((item) => {
          const config = TYPE_CONFIG[item.type];
          const Icon = config.icon;
          return (
            <li key={item.id} className="flex items-start gap-3 py-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.fg}`}
                aria-hidden
              >
                <Icon size={16} />
              </span>
              <div className="flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  <span className="font-medium">{item.customerName}</span>{" "}
                  {item.message}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {formatRelativeTime(item.timestamp)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
