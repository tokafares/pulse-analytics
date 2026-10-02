import type { KpiMetric } from "../../types";
import { formatCurrency, formatNumber, formatPercent } from "../../lib/format";
import { Card } from "../ui/Card";

function formatValue(metric: KpiMetric): string {
  switch (metric.format) {
    case "currency":
      return formatCurrency(metric.value);
    case "percent":
      return formatPercent(metric.value);
    default:
      return formatNumber(metric.value);
  }
}

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const isPositive = metric.changePercent >= 0;
  return (
    <Card>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {metric.label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
        {formatValue(metric)}
      </p>
      <p
        className={`mt-2 inline-flex items-center gap-1 text-sm font-medium ${
          isPositive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-rose-600 dark:text-rose-400"
        }`}
      >
        <span aria-hidden>{isPositive ? "↑" : "↓"}</span>
        {Math.abs(metric.changePercent).toFixed(1)}%
        <span className="font-normal text-slate-400 dark:text-slate-500">
          vs last month
        </span>
      </p>
    </Card>
  );
}
