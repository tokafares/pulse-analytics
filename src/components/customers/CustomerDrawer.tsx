import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Customer } from "../../types";
import { formatCurrency, formatDate, formatRelativeTime } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { StatusBadge } from "../ui/Badge";

interface CustomerDrawerProps {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerDrawer({ customer, onClose }: CustomerDrawerProps) {
  const isOpen = customer !== null;
  const [displayedCustomer, setDisplayedCustomer] = useState<Customer | null>(
    customer
  );
  const [prevCustomer, setPrevCustomer] = useState<Customer | null>(customer);

  if (customer !== prevCustomer) {
    setPrevCustomer(customer);
    if (customer !== null) {
      setDisplayedCustomer(customer);
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-out dark:bg-slate-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {displayedCustomer && (
          <>
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Customer details
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex items-center gap-3">
                <Avatar
                  name={displayedCustomer.name}
                  color={displayedCustomer.avatarColor}
                  size={48}
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {displayedCustomer.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {displayedCustomer.email}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Company</dt>
                  <dd className="mt-0.5 font-medium text-slate-900 dark:text-white">
                    {displayedCustomer.company}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Status</dt>
                  <dd className="mt-0.5">
                    <StatusBadge status={displayedCustomer.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Plan</dt>
                  <dd className="mt-0.5 font-medium capitalize text-slate-900 dark:text-white">
                    {displayedCustomer.plan}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">MRR</dt>
                  <dd className="mt-0.5 font-medium text-slate-900 dark:text-white">
                    {formatCurrency(displayedCustomer.mrr)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Signed up</dt>
                  <dd className="mt-0.5 font-medium text-slate-900 dark:text-white">
                    {formatDate(displayedCustomer.signupDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">Last active</dt>
                  <dd className="mt-0.5 font-medium text-slate-900 dark:text-white">
                    {formatRelativeTime(displayedCustomer.lastActive)}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
