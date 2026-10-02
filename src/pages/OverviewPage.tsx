import {
  fetchActivity,
  fetchKpis,
  fetchRevenueSeries,
  fetchSignupChannels,
} from "../data/api";
import { useAsyncData } from "../hooks/useAsyncData";
import { KpiCard } from "../components/overview/KpiCard";
import { RevenueChart } from "../components/overview/RevenueChart";
import { SignupsChart } from "../components/overview/SignupsChart";
import { ActivityFeed } from "../components/overview/ActivityFeed";
import { Skeleton } from "../components/ui/Skeleton";
import { Card } from "../components/ui/Card";

export function OverviewPage() {
  const kpis = useAsyncData(fetchKpis, []);
  const revenue = useAsyncData(fetchRevenueSeries, []);
  const channels = useAsyncData(fetchSignupChannels, []);
  const activity = useAsyncData(fetchActivity, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Overview
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A snapshot of how Pulse Analytics is performing this month.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.isLoading || !kpis.data
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-3 h-7 w-32" />
                <Skeleton className="mt-3 h-4 w-20" />
              </Card>
            ))
          : kpis.data.map((metric) => <KpiCard key={metric.id} metric={metric} />)}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {revenue.isLoading || !revenue.data ? (
          <Card className="col-span-full lg:col-span-2">
            <Skeleton className="h-[280px] w-full" />
          </Card>
        ) : (
          <RevenueChart data={revenue.data} />
        )}

        {channels.isLoading || !channels.data ? (
          <Card>
            <Skeleton className="h-[280px] w-full" />
          </Card>
        ) : (
          <SignupsChart data={channels.data} />
        )}
      </div>

      {activity.isLoading || !activity.data ? (
        <Card>
          <Skeleton className="h-6 w-40" />
          <div className="mt-4 flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </Card>
      ) : (
        <ActivityFeed items={activity.data} />
      )}
    </div>
  );
}
