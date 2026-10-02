import type { Customer, SortState } from "../../types";
import { formatCurrency, formatDate } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { StatusBadge } from "../ui/Badge";

export type CustomerSortColumn = "name" | "company" | "mrr" | "signupDate";

interface CustomerTableProps {
  customers: Customer[];
  sort: SortState<CustomerSortColumn>;
  onSortChange: (column: CustomerSortColumn) => void;
  onRowClick: (customer: Customer) => void;
}

const COLUMNS: Array<{ key: CustomerSortColumn; label: string }> = [
  { key: "name", label: "Customer" },
  { key: "company", label: "Company" },
  { key: "mrr", label: "MRR" },
  { key: "signupDate", label: "Signed up" },
];

export function CustomerTable({
  customers,
  sort,
  onSortChange,
  onRowClick,
}: CustomerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {COLUMNS.map((column) => (
              <th key={column.key} className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
                <button
                  type="button"
                  onClick={() => onSortChange(column.key)}
                  className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                >
                  {column.label}
                  {sort.column === column.key && (
                    <span aria-hidden>{sort.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
            ))}
            <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => onRowClick(customer)}
              className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800/50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={customer.name} color={customer.avatarColor} size={32} />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {customer.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                {customer.company}
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                {formatCurrency(customer.mrr)}
              </td>
              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                {formatDate(customer.signupDate)}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={customer.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
