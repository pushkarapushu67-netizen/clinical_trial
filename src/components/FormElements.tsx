import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
}

export const MedicalInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="label-caps">{label}</label>
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full h-10 px-3 bg-white border border-outline-variant rounded-medical",
              "focus:outline-none focus:ring-2 focus:ring-primary-clinical focus:ring-offset-2",
              "data-mono transition-all",
              unit && "pr-12",
              error && "border-status-critical",
              className
            )}
            {...props}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 label-caps opacity-50 pointer-events-none">
              {unit}
            </span>
          )}
        </div>
        {error && <span className="text-[10px] text-status-critical font-medium">{error}</span>}
      </div>
    );
  }
);

MedicalInput.displayName = "MedicalInput";

export const MedicalSelect = React.forwardRef<HTMLSelectElement, any>(
  ({ label, options, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="label-caps">{label}</label>
        <select
          ref={ref}
          className={cn(
            "w-full h-10 px-3 bg-white border border-outline-variant rounded-medical",
            "focus:outline-none focus:ring-2 focus:ring-primary-clinical focus:ring-offset-2",
            "font-hanken text-body-sm transition-all appearance-none",
            className
          )}
          {...props}
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

MedicalSelect.displayName = "MedicalSelect";
