import { useMemo, useState } from "react";
import { fetchCustomers } from "../data/api";
import { useAsyncData } from "../hooks/useAsyncData";
import type { Customer, CustomerStatus, SortState } from "../types";
import {
  CustomerTable,
  type CustomerSortColumn,
} from "../components/customers/CustomerTable";
import { CustomerCardList } from "../components/customers/CustomerCardList";
import { CustomerDrawer } from "../components/customers/CustomerDrawer";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { Pagination } from "../components/ui/Pagination";

const PAGE_SIZE = 10;

const STATUS_FILTERS: Array<{ value: CustomerStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "trial", label: "Trial" },
  { value: "churned", label: "Churned" },
];

function compareCustomers(
  a: Customer,
  b: Customer,
  column: CustomerSortColumn
): number {
  switch (column) {
    case "mrr":
      return a.mrr - b.mrr;
    case "signupDate":
      return new Date(a.signupDate).getTime() - new Date(b.signupDate).getTime();
    default:
      return a[column].localeCompare(b[column]);
  }
}

export function CustomersPage() {
  const { data, isLoading } = useAsyncData(fetchCustomers, []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">("all");
  const [sort, setSort] = useState<SortState<CustomerSortColumn>>({
    column: "signupDate",
    direction: "desc",
  });
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();
    return data.filter((customer) => {
      const matchesSearch =
        query === "" ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.company.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const result = compareCustomers(a, b, sort.column);
      return sort.direction === "asc" ? result : -result;
    });
    return copy;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSortChange(column: CustomerSortColumn) {
    setSort((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" }
    );
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: CustomerStatus | "all") {
    setStatusFilter(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Customers
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isLoading ? "Loading customers…" : `${sorted.length} customers found`}
        </p>
      </div>

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name, email, or company…"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:max-w-xs"
          />
          <select
            value={statusFilter}
            onChange={(e) =>
              handleStatusChange(e.target.value as CustomerStatus | "all")
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No customers match your filters"
              description="Try adjusting your search term or status filter."
            />
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <CustomerTable
                customers={paginated}
                sort={sort}
                onSortChange={handleSortChange}
                onRowClick={setSelectedCustomer}
              />
            </div>
            <div className="md:hidden">
              <CustomerCardList
                customers={paginated}
                onCardClick={setSelectedCustomer}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <CustomerDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}
