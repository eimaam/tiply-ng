import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const MotionAntButton = (motion as any).create(AntButton) as any;

const buttonStyles = cva(
  'font-sans flex items-center rounded-xl justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          '!bg-zinc-950 !text-white hover:!bg-zinc-800 active:!scale-[0.99] !border-0 !shadow-2xs',
        destructive: '!bg-rose-600 !text-white hover:!bg-rose-700 !border-0 !shadow-2xs',
        outline:
          '!border !border-stone-200 !bg-white !text-zinc-900 hover:!bg-stone-50 hover:!border-stone-300 !shadow-2xs',
        secondary:
          '!bg-stone-100 !text-zinc-900 hover:!bg-stone-200/70 !border !border-stone-200',
        tertiary:
          '!bg-emerald-50 !text-emerald-900 hover:!bg-emerald-100/70 !border !border-emerald-200/60',
        ghost:
          '!border-0 !bg-transparent hover:!bg-stone-100 !text-zinc-700 hover:!text-zinc-950 !shadow-none',
        link: '!text-emerald-700 hover:!text-emerald-800 !underline-offset-4 hover:!underline !bg-transparent !p-0 !border-0 !shadow-none',
        filled: '!bg-zinc-900 !text-white hover:!bg-zinc-800 !border-0',
      },
      size: {
        default: '!min-h-10 !px-4 !py-2 !text-xs sm:!text-sm',
        sm: '!min-h-8.5 !px-3 !py-1.5 !text-xs !rounded-lg',
        md: '!min-h-10.5 !px-4 !py-2 !text-sm !rounded-xl',
        lg: '!min-h-12 !px-6 !py-2.5 !text-sm sm:!text-base !rounded-xl',
        icon: '!h-10 !w-10 !p-0 !rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  },
);

interface ButtonProps
  extends Omit<AntButtonProps, 'size' | 'variant'>,
    VariantProps<typeof buttonStyles> {
  className?: string;
  icon?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  animate?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      icon,
      htmlType = 'button',
      children,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const antSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';

    const shouldAnimate = animate && !props.disabled && !props.loading;

    return (
      <MotionAntButton
        className={cn(
          buttonStyles({ variant, size, fullWidth, className }),
        )}
        size={antSize}
        icon={icon}
        htmlType={htmlType}
        ref={ref}
        {...props}
        whileHover={shouldAnimate ? 'hover' : undefined}
        whileTap={shouldAnimate ? 'tap' : undefined}
        style={variant === 'default' && shouldAnimate ? { position: 'relative', overflow: 'hidden' } : {}}
      >
        {children}
      </MotionAntButton>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonStyles as buttonVariants };
