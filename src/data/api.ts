import { randomDelay } from "../lib/delay";
import type {
  ActivityItem,
  AuthUser,
  Customer,
  KpiMetric,
  RevenuePoint,
  SignupChannelPoint,
} from "../types";
import { MOCK_CUSTOMERS } from "./customers";
import {
  MOCK_ACTIVITY,
  MOCK_KPIS,
  MOCK_REVENUE_SERIES,
  MOCK_SIGNUP_CHANNELS,
} from "./overview";

/**
 * Fake API layer. Each function mimics a real network call with a small
 * randomized delay, so it can be swapped for real `fetch` calls later
 * without changing any calling code.
 */

export async function fetchKpis(): Promise<KpiMetric[]> {
  await randomDelay();
  return MOCK_KPIS;
}

export async function fetchRevenueSeries(): Promise<RevenuePoint[]> {
  await randomDelay();
  return MOCK_REVENUE_SERIES;
}

export async function fetchSignupChannels(): Promise<SignupChannelPoint[]> {
  await randomDelay();
  return MOCK_SIGNUP_CHANNELS;
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  await randomDelay();
  return MOCK_ACTIVITY;
}

export async function fetchCustomers(): Promise<Customer[]> {
  await randomDelay(500, 1100);
  return MOCK_CUSTOMERS;
}

export async function fetchCustomerById(
  id: string
): Promise<Customer | null> {
  await randomDelay(200, 500);
  return MOCK_CUSTOMERS.find((customer) => customer.id === id) ?? null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  await randomDelay(600, 1200);
  const name = credentials.email.split("@")[0] ?? "Demo User";
  return {
    id: "user-1",
    name: name
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    email: credentials.email,
    role: "Administrator",
    avatarColor: "#6366f1",
  };
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  company: string;
  role: string;
  bio: string;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfilePayload> {
  await randomDelay(500, 900);
  return payload;
}
