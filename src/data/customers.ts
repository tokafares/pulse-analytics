import type { Customer, CustomerStatus } from "../types";

const FIRST_NAMES = [
  "Ava", "Liam", "Noah", "Emma", "Olivia", "Mason", "Sophia", "Ethan",
  "Isabella", "Lucas", "Mia", "Henry", "Amelia", "Jack", "Harper", "Leo",
  "Evelyn", "Owen", "Luna", "Carter", "Grace", "Wyatt", "Chloe", "Julian",
  "Zoey", "Levi", "Nora", "Isaac", "Riley", "Elijah",
];

const LAST_NAMES = [
  "Bennett", "Hughes", "Carter", "Foster", "Nguyen", "Patel", "Kim",
  "Rodriguez", "Walsh", "Mitchell", "Coleman", "Reyes", "Flores", "Price",
  "Sanders", "Bell", "Ward", "Russell", "Ortiz", "Spencer",
];

const COMPANIES = [
  "Northwind Labs", "Brightwave", "Cobalt Systems", "Summit Analytics",
  "Vertex Digital", "Lumen Works", "Pinecrest Co", "Orbital Software",
  "Driftwood Media", "Clearpath Inc", "Granite Cloud", "Marble Tech",
  "Harborlight", "Fieldstone", "Ashgrove Partners", "Beacon Metrics",
  "Redwood Systems", "Tidewater SaaS", "Stonebridge", "Kestrel Apps",
];

const STATUSES: CustomerStatus[] = ["active", "trial", "churned"];
const PLANS: Customer["plan"][] = ["starter", "pro", "enterprise"];
const AVATAR_COLORS = [
  "#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444",
  "#06b6d4", "#84cc16",
];

function seededRandom(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const rand = seededRandom(42);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function randomDateWithinDays(daysAgo: number): string {
  const now = Date.now();
  const past = now - rand() * daysAgo * 24 * 60 * 60 * 1000;
  return new Date(past).toISOString();
}

function generateCustomer(index: number): Customer {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const company = pick(COMPANIES);
  const status = pick(STATUSES);
  const plan = pick(PLANS);
  const baseMrr = plan === "starter" ? 29 : plan === "pro" ? 99 : 499;
  const mrr = status === "churned" ? 0 : baseMrr + Math.floor(rand() * 50);

  return {
    id: `cust-${index + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${company
      .toLowerCase()
      .replace(/\s+/g, "")}.com`,
    company,
    status,
    plan,
    mrr,
    signupDate: randomDateWithinDays(500),
    lastActive: randomDateWithinDays(status === "churned" ? 400 : 14),
    avatarColor: pick(AVATAR_COLORS),
  };
}

export const MOCK_CUSTOMERS: Customer[] = Array.from({ length: 87 }, (_, i) =>
  generateCustomer(i)
);
