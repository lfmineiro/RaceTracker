import { type TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = ({ label, error, className = '', ...props }: FormTextareaProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-slate-700">
        {label}
      </label>
      <textarea
        className={`w-full border rounded-lg px-3 py-2 outline-none transition-all focus:ring-2 focus:ring-indigo-500 resize-none ${
          error ? 'border-red-500' : 'border-slate-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
};
