import React from 'react';
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps, RefSelectProps } from 'antd';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

type SelectVariant = 'default' | 'filled' | 'borderless';
type SelectSize = 'sm' | 'md' | 'lg';

const selectVariants = cva(
  'w-full transition-colors font-sans text-zinc-900 rounded-xl [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border [&_.ant-select-selector]:!shadow-2xs',
  {
    variants: {
      variant: {
        default:
          '[&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!border-stone-200 hover:[&_.ant-select-selector]:!border-stone-300 focus-within:[&_.ant-select-selector]:!border-zinc-950 focus-within:[&_.ant-select-selector]:!ring-1 focus-within:[&_.ant-select-selector]:!ring-zinc-950',
        filled:
          '[&_.ant-select-selector]:!bg-stone-50 [&_.ant-select-selector]:!border-stone-200/80 hover:[&_.ant-select-selector]:!border-stone-300 focus-within:[&_.ant-select-selector]:!bg-white focus-within:[&_.ant-select-selector]:!border-zinc-950',
        borderless: '[&_.ant-select-selector]:!border-transparent [&_.ant-select-selector]:!bg-transparent !shadow-none',
      },
      size: {
        sm: '!h-8.5 !text-xs [&_.ant-select-selector]:!min-h-8.5 [&_.ant-select-selector]:!px-2.5',
        md: '!h-10.5 !text-sm [&_.ant-select-selector]:!min-h-10.5 [&_.ant-select-selector]:!px-3',
        lg: '!h-12.5 !text-base [&_.ant-select-selector]:!min-h-12.5 [&_.ant-select-selector]:!px-4',
      },
      status: {
        error: '[&_.ant-select-selector]:!border-rose-500 hover:[&_.ant-select-selector]:!border-rose-600',
        warning: '[&_.ant-select-selector]:!border-amber-500 hover:[&_.ant-select-selector]:!border-amber-600',
        success: '[&_.ant-select-selector]:!border-emerald-500 hover:[&_.ant-select-selector]:!border-emerald-600',
      },
      disabled: {
        true: '!opacity-50 !cursor-not-allowed [&_.ant-select-selector]:!bg-stone-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BaseSelectProps {
  variant?: SelectVariant;
  size?: SelectSize;
  status?: 'error' | 'warning' | 'success';
  fullWidth?: boolean;
  className?: string;
  role?: string;
}

export const Select = React.forwardRef<
  RefSelectProps,
  BaseSelectProps & Omit<AntSelectProps, 'size' | 'role'> & { role?: string }
>(({ className, variant, status, disabled, size, ...props }, ref) => {
  const antStatus = status as AntSelectProps['status'];

  return (
    <AntSelect
      className={cn(selectVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Select.displayName = 'Select';

export const Option = AntSelect.Option as any;
export const OptGroup = AntSelect.OptGroup as any;
