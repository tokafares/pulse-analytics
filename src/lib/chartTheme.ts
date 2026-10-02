import type { Theme } from "../context/ThemeContext";

export interface ChartColors {
  axisText: string;
  grid: string;
  cursorFill: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  tooltipMutedText: string;
}

const LIGHT_CHART_COLORS: ChartColors = {
  axisText: "#64748b",
  grid: "#e2e8f0",
  cursorFill: "rgba(99, 102, 241, 0.08)",
  tooltipBg: "#ffffff",
  tooltipBorder: "#e2e8f0",
  tooltipText: "#0f172a",
  tooltipMutedText: "#64748b",
};

const DARK_CHART_COLORS: ChartColors = {
  axisText: "#94a3b8",
  grid: "#334155",
  cursorFill: "rgba(129, 140, 248, 0.12)",
  tooltipBg: "#1e293b",
  tooltipBorder: "#334155",
  tooltipText: "#f1f5f9",
  tooltipMutedText: "#94a3b8",
};

export function getChartColors(theme: Theme): ChartColors {
  return theme === "dark" ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
}
