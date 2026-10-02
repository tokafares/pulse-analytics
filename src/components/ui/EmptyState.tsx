interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
      {icon && <div className="text-slate-400 dark:text-slate-500">{icon}</div>}
      <p className="font-medium text-slate-700 dark:text-slate-200">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
