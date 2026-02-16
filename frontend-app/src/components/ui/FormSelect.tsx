import { type SelectHTMLAttributes, type ReactNode } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export const FormSelect = ({ label, error, className = '', children, ...props }: FormSelectProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-slate-700">
        {label}
      </label>
      <select
        className={`w-full border rounded-lg px-3 py-2 outline-none transition-all focus:ring-2 focus:ring-indigo-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
};
