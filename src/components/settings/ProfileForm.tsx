import { useState } from "react";
import type { FormEvent } from "react";
import type { ProfileFormData } from "../../types";
import { updateProfile } from "../../data/api";
import { Card } from "../ui/Card";

type FormErrors = Partial<Record<keyof ProfileFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ProfileFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.company.trim()) errors.company = "Company is required.";
  if (!data.role.trim()) errors.role = "Role is required.";
  if (data.bio.length > 280) errors.bio = "Bio must be 280 characters or fewer.";
  return errors;
}

interface ProfileFormProps {
  initialData: ProfileFormData;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  function handleChange<K extends keyof ProfileFormData>(
    key: K,
    value: ProfileFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSavedMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    setSavedMessage(null);
    try {
      await updateProfile(formData);
      setSavedMessage("Profile updated successfully.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="name"
            label="Full name"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            error={errors.name}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            error={errors.email}
          />
          <Field
            id="company"
            label="Company"
            value={formData.company}
            onChange={(value) => handleChange("company", value)}
            error={errors.company}
          />
          <Field
            id="role"
            label="Role"
            value={formData.role}
            onChange={(value) => handleChange("role", value)}
            error={errors.role}
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.bio ? (
              <p className="text-xs text-rose-600 dark:text-rose-400">{errors.bio}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {formData.bio.length}/280
            </p>
          </div>
        </div>

        {savedMessage && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            {savedMessage}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </Card>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}

function Field({ id, label, value, onChange, error, type = "text" }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 dark:bg-slate-800 dark:text-white ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700"
        }`}
      />
      {error && <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
}
