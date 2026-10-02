import type { CustomerStatus } from "../../types";

const STATUS_STYLES: Record<CustomerStatus, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  trial:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  churned: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
};

const STATUS_LABELS: Record<CustomerStatus, string> = {
  active: "Active",
  trial: "Trial",
  churned: "Churned",
};

export function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
