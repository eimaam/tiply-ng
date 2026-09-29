import React from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import { cva } from 'class-variance-authority';
import { MotionDiv } from './MotionComponents';
import { cn } from '../../lib/utils';

const AntCardComponent = AntCard as any;

type CardVariant = 'default' | 'outlined' | 'elevated';
type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardBorder = 'none' | 'solid' | 'dashed' | 'dotted';

const cardVariants = cva('overflow-hidden transition-all duration-300 [&_.ant-card-body]:!p-0', {
  variants: {
    variant: {
      default: '!bg-white !border !border-stone-200/90 !shadow-2xs hover:!border-stone-300',
      outlined: '!bg-white !border !border-stone-200',
      elevated: '!bg-white !border !border-stone-200 !shadow-md',
    },
    rounded: {
      none: '!rounded-none',
      sm: '!rounded-lg',
      md: '!rounded-xl',
      lg: '!rounded-2xl',
      xl: '!rounded-3xl',
    },
    padding: {
      none: '!p-0',
      sm: '!p-3 sm:!p-4',
      md: '!p-4 sm:!p-6',
      lg: '!p-6 sm:!p-8',
      xl: '!p-8 sm:!p-10',
    },
    border: {
      none: '!border-none',
      solid: '!border',
      dashed: '!border-dashed',
      dotted: '!border-dotted',
    },
    shadow: {
      none: '!shadow-none',
      sm: '!shadow-2xs',
      md: '!shadow-xs',
      lg: '!shadow-md',
      xl: '!shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    rounded: 'lg',
    padding: 'none',
    border: 'none',
  },
});

export interface CardProps extends Omit<AntCardProps, 'type' | 'variant'> {
  variant?: CardVariant;
  rounded?: CardRounded;
  padding?: CardPadding;
  animate?: boolean;
  shadow?: CardShadow;
  border?:   CardBorder;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Card = ({
  className,
  children,
  animate = false,
  variant = 'default',
  rounded,
  padding,
  shadow,
  border,
  title,
  extra,
  bordered,
  hoverable = false,
  cover,
  actions,
  ref,
  ...props
}: CardProps) => {
  const cardStyles = cardVariants({
    variant: variant as CardVariant,
    rounded: rounded as CardRounded,
    padding: padding as CardPadding,
    shadow: shadow as CardShadow,
    border: border as CardBorder,
    className,
  });

  const cardContent = (
    <AntCardComponent
      className={cn(cardStyles)}
      title={
        null
      }
      bordered={bordered}
      hoverable={hoverable}
      cover={cover}
      actions={actions}
      ref={ref}
      {...props}
    >
      {
        (title && !extra) ? <h3 className="text-lg md:text-xl mb-4 font-sans font-bold tracking-tight text-zinc-950">
        {title}
      </h3>:
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-sans font-bold tracking-tight text-zinc-950">
        {title}
      </h3>
        {extra}
      </div>
      }
      {children}
    </AntCardComponent>
  );

  if (animate) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </MotionDiv>
    );
  }

  return cardContent;
};

export const { Meta: CardMeta } = AntCard;

type CardSpacing = 'none' | 'sm' | 'md' | 'lg';

const cardContentVariants = cva('card-content', {
  variants: {
    spacing: {
      none: 'mt-0',
      sm: 'mt-2',
      md: 'mt-4',
      lg: 'mt-6',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: CardSpacing;
  className?: string;
  children?: React.ReactNode;
}

export const CardContent = ({
  className,
  children,
  spacing = 'md',
  ...props
}: CardContentProps) => {
  const contentStyles = cardContentVariants({
    spacing: spacing as CardSpacing,
    className,
  });

  return (
    <div className={cn(contentStyles)} {...props}>
      {children}
    </div>
  );
};
