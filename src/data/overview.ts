import type {
  ActivityItem,
  KpiMetric,
  RevenuePoint,
  SignupChannelPoint,
} from "../types";

export const MOCK_KPIS: KpiMetric[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 428_900,
    format: "currency",
    changePercent: 12.4,
    trend: "up",
  },
  {
    id: "users",
    label: "Active Users",
    value: 14_382,
    format: "number",
    changePercent: 8.1,
    trend: "up",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: 2.3,
    format: "percent",
    changePercent: -0.6,
    trend: "down",
  },
  {
    id: "mrr",
    label: "MRR",
    value: 61_250,
    format: "currency",
    changePercent: 5.7,
    trend: "up",
  },
];

export const MOCK_REVENUE_SERIES: RevenuePoint[] = [
  { month: "Nov", revenue: 28_400 },
  { month: "Dec", revenue: 31_200 },
  { month: "Jan", revenue: 33_900 },
  { month: "Feb", revenue: 32_100 },
  { month: "Mar", revenue: 36_800 },
  { month: "Apr", revenue: 39_500 },
  { month: "May", revenue: 41_200 },
  { month: "Jun", revenue: 44_700 },
  { month: "Jul", revenue: 43_100 },
  { month: "Aug", revenue: 48_900 },
  { month: "Sep", revenue: 52_300 },
  { month: "Oct", revenue: 56_700 },
];

export const MOCK_SIGNUP_CHANNELS: SignupChannelPoint[] = [
  { channel: "Organic", signups: 412 },
  { channel: "Referral", signups: 268 },
  { channel: "Paid Ads", signups: 331 },
  { channel: "Social", signups: 189 },
  { channel: "Partner", signups: 97 },
];

const ACTIVITY_TEMPLATES: Array<{
  type: ActivityItem["type"];
  message: string;
}> = [
  { type: "signup", message: "signed up for the Pro plan" },
  { type: "upgrade", message: "upgraded from Starter to Pro" },
  { type: "upgrade", message: "upgraded from Pro to Enterprise" },
  { type: "downgrade", message: "downgraded to Starter plan" },
  { type: "churn", message: "cancelled their subscription" },
  { type: "payment", message: "payment of $99.00 was processed" },
  { type: "signup", message: "started a 14-day trial" },
  { type: "payment", message: "payment of $499.00 was processed" },
];

const ACTIVITY_NAMES = [
  "Ava Bennett", "Liam Hughes", "Noah Carter", "Emma Foster",
  "Olivia Nguyen", "Mason Patel", "Sophia Kim", "Ethan Rodriguez",
  "Isabella Walsh", "Lucas Mitchell",
];

export const MOCK_ACTIVITY: ActivityItem[] = ACTIVITY_TEMPLATES.map(
  (template, i) => ({
    id: `activity-${i + 1}`,
    type: template.type,
    message: template.message,
    customerName: ACTIVITY_NAMES[i % ACTIVITY_NAMES.length],
    timestamp: new Date(Date.now() - i * 1000 * 60 * 47).toISOString(),
  })
);
