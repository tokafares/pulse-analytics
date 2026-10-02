import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SignupChannelPoint } from "../../types";
import { getChartColors } from "../../lib/chartTheme";
import { useTheme } from "../../hooks/useTheme";
import { Card } from "../ui/Card";
import { ChartTooltip } from "../ui/ChartTooltip";

export function SignupsChart({ data }: { data: SignupChannelPoint[] }) {
  const { theme } = useTheme();
  const colors = getChartColors(theme);

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Signups by channel
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="channel"
            tick={{ fontSize: 11, fill: colors.axisText }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: colors.axisText }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: colors.cursorFill }}
          />
          <Bar dataKey="signups" name="Signups" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
