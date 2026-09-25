import React from 'react';
import { cn } from '../../utils/cn';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, checked, ...props }, ref) => {
    return (
      <label className={cn('flex items-center justify-between cursor-pointer', className)}>
        <div className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</span>}
          {description && <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>}
        </div>
        <div className="relative inline-flex items-center shrink-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            ref={ref}
            {...props}
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </div>
      </label>
    );
  }
);
Switch.displayName = 'Switch';
