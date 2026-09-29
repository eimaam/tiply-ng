import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import type { CheckboxProps as AntCheckboxProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const checkboxVariants = cva(
  '[&_.ant-checkbox-inner]:!border-stone-300 [&_.ant-checkbox-inner]:!rounded-md [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-emerald-600 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-emerald-600 [&_.ant-checkbox-checked_.ant-checkbox-inner:after]:!border-white [&_.ant-checkbox-inner]:!transition-colors',
  {
    variants: {
      tone: {
        default: '',
        /** Slightly larger hit target for dense legal / form rows */
        comfortable: '!mt-1.5',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
);

export interface CheckboxProps
  extends AntCheckboxProps,
    VariantProps<typeof checkboxVariants> {
  className?: string;
}

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof AntCheckbox>,
  CheckboxProps
>(({ className, tone, ...props }, ref) => (
  <AntCheckbox ref={ref} className={cn(checkboxVariants({ tone }), className)} {...props} />
));

Checkbox.displayName = 'Checkbox';
