// src/components/ui/Input.tsx
import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={props.id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            px-3 py-2 border rounded-lg shadow-sm outline-none transition-all
            focus:ring-2 focus:ring-blue-500
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300'}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';