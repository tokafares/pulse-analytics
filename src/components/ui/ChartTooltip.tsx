import { useTheme } from "../../hooks/useTheme";
import { getChartColors } from "../../lib/chartTheme";

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
}

interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: TooltipPayloadItem[];
  valueFormatter?: (value: number) => string;
}

export function ChartTooltip({
  active,
  label,
  payload,
  valueFormatter,
}: ChartTooltipProps) {
  const { theme } = useTheme();
  const colors = getChartColors(theme);

  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="rounded-lg px-3 py-2 text-sm shadow-lg"
      style={{
        backgroundColor: colors.tooltipBg,
        border: `1px solid ${colors.tooltipBorder}`,
        color: colors.tooltipText,
      }}
    >
      {label !== undefined && (
        <p className="mb-1 font-medium" style={{ color: colors.tooltipText }}>
          {label}
        </p>
      )}
      {payload.map((item, index) => {
        const numericValue =
          typeof item.value === "number" ? item.value : Number(item.value ?? 0);
        const displayValue = valueFormatter
          ? valueFormatter(numericValue)
          : String(item.value);
        return (
          <div key={index} className="flex items-center gap-2">
            {item.color && (
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span style={{ color: colors.tooltipMutedText }}>
              {item.name ?? item.dataKey}
            </span>
            <span className="font-medium" style={{ color: colors.tooltipText }}>
              {displayValue}
            </span>
          </div>
        );
      })}
    </div>
  );
}
