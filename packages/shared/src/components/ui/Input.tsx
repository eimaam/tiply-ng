import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps, InputRef } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const { TextArea, Password, Search } = AntInput;

type InputVariant = 'default' | 'filled' | 'borderless';
type InputSize = 'sm' | 'md' | 'lg';

const inputVariants = cva(
  'w-full transition-colors font-sans text-zinc-900 rounded-xl border placeholder:text-zinc-400 focus:outline-none focus:ring-1 shadow-2xs',
  {
    variants: {
      variant: {
        default:
          'bg-white border-stone-200 hover:border-stone-300 focus:border-zinc-950 focus:ring-zinc-950 text-zinc-900',
        filled:
          'bg-stone-50 border-stone-200/80 hover:border-stone-300 focus:bg-white focus:border-zinc-950 focus:ring-zinc-950 text-zinc-900',
        borderless: '!border-transparent !bg-transparent !shadow-none focus:ring-0',
      },
      size: {
        sm: '!min-h-8.5 !text-xs !px-3 !py-1.5 !rounded-lg',
        md: '!min-h-10.5 !text-sm !px-3.5 !py-2 !rounded-xl',
        lg: '!min-h-12.5 !text-base !px-4 !py-2.5 !rounded-xl',
      },
      status: {
        error: '!border-rose-500 focus:!border-rose-600 focus:!ring-rose-500 !text-rose-900',
        warning: '!border-amber-500 focus:!border-amber-600 focus:!ring-amber-500',
        success: '!border-emerald-500 focus:!border-emerald-600 focus:!ring-emerald-500',
      },
      disabled: {
        true: '!opacity-50 !cursor-not-allowed !bg-stone-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BaseInputProps {
  variant?: InputVariant;
  size?: InputSize;
  status?: 'error' | 'warning' | 'success';
  fullWidth?: boolean;
  className?: string;
}

export const Input = React.forwardRef<InputRef, BaseInputProps & Omit<AntInputProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <AntInput
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export const Textarea = React.forwardRef<InputRef, BaseInputProps & Omit<TextAreaProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  rows = 4,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <TextArea
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      rows={rows}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export const PasswordInput = React.forwardRef<InputRef, BaseInputProps & Omit<AntInputProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <Password
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';


export const SearchInput = React.forwardRef<InputRef, BaseInputProps & Omit<AntInputProps, 'size'> & { onSearch?: (value: string) => void }>(({
  className,
  variant,
  status,
  disabled,
  size,
  onSearch,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <Search
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      onSearch={onSearch}
      ref={ref}
      {...props}
    />
  );
});

SearchInput.displayName = 'SearchInput';
