import { useAuth } from "../hooks/useAuth";
import { ProfileForm } from "../components/settings/ProfileForm";

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your profile information.
        </p>
      </div>

      <div className="max-w-2xl">
        <ProfileForm
          initialData={{
            name: user?.name ?? "",
            email: user?.email ?? "",
            company: "Pulse Analytics",
            role: user?.role ?? "",
            bio: "",
          }}
        />
      </div>
    </div>
  );
}
