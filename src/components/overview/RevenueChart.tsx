import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenuePoint } from "../../types";
import { formatCurrency } from "../../lib/format";
import { getChartColors } from "../../lib/chartTheme";
import { useTheme } from "../../hooks/useTheme";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Card } from "../ui/Card";
import { ChartTooltip } from "../ui/ChartTooltip";

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const { theme } = useTheme();
  const colors = getChartColors(theme);
  const isNarrow = useMediaQuery("(max-width: 640px)");

  return (
    <Card className="col-span-full lg:col-span-2">
      <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Revenue over time
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: colors.axisText }}
            axisLine={false}
            tickLine={false}
            interval={isNarrow ? 1 : 0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: colors.axisText }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) => `$${value / 1000}k`}
          />
          <Tooltip
            content={<ChartTooltip valueFormatter={formatCurrency} />}
            cursor={{ stroke: colors.grid }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
