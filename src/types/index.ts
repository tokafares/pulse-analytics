export type CustomerStatus = "active" | "trial" | "churned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  plan: "starter" | "pro" | "enterprise";
  mrr: number;
  signupDate: string;
  lastActive: string;
  avatarColor: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  changePercent: number;
  trend: "up" | "down";
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface SignupChannelPoint {
  channel: string;
  signups: number;
}

export type ActivityType =
  | "signup"
  | "upgrade"
  | "downgrade"
  | "churn"
  | "payment";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  customerName: string;
  timestamp: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarColor: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  bio: string;
}

export type SortDirection = "asc" | "desc";

export interface SortState<T extends string> {
  column: T;
  direction: SortDirection;
}
