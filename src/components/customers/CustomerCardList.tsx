import type { Customer } from "../../types";
import { formatCurrency, formatDate } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { StatusBadge } from "../ui/Badge";

interface CustomerCardListProps {
  customers: Customer[];
  onCardClick: (customer: Customer) => void;
}

export function CustomerCardList({
  customers,
  onCardClick,
}: CustomerCardListProps) {
  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {customers.map((customer) => (
        <li key={customer.id}>
          <button
            type="button"
            onClick={() => onCardClick(customer)}
            className="flex w-full flex-col gap-3 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <div className="flex items-center gap-3">
              <Avatar name={customer.name} color={customer.avatarColor} size={40} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900 dark:text-white">
                  {customer.name}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {customer.email}
                </p>
              </div>
              <StatusBadge status={customer.status} />
            </div>

            <dl className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Company</dt>
                <dd className="mt-0.5 truncate font-medium text-slate-700 dark:text-slate-200">
                  {customer.company}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 dark:text-slate-500">MRR</dt>
                <dd className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                  {formatCurrency(customer.mrr)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 dark:text-slate-500">Signed up</dt>
                <dd className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                  {formatDate(customer.signupDate)}
                </dd>
              </div>
            </dl>
          </button>
        </li>
      ))}
    </ul>
  );
}
