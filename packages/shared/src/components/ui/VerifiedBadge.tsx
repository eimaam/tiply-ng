import React from 'react';
import { cn } from '../../lib/utils';

export interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
  title?: string;
}

const sizeConfig = {
  xs: { badge: 'w-3.5 h-3.5', text: 'text-[10px]' },
  sm: { badge: 'w-4 h-4', text: 'text-xs' },
  md: { badge: 'w-5 h-5', text: 'text-xs' },
  lg: { badge: 'w-6 h-6', text: 'text-sm' },
};

/**
 * Custom Verified Badge for verified creators on tiply.ng.
 * Features a bespoke 12-point scalloped seal with an emerald gradient
 * and crisp white checkmark.
 */
export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'sm',
  showLabel = false,
  className,
  labelClassName,
  title = 'Verified creator on tiply.ng',
}) => {
  const cfg = sizeConfig[size] || sizeConfig.sm;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 select-none shrink-0 align-middle',
        className
      )}
      title={title}
      aria-label={title}
    >
      <svg
        className={cn(cfg.badge, 'transition-transform hover:scale-110')}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tiplyVerifiedGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <filter id="tiplyVerifiedGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#047857" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Custom 12-point scalloped starburst seal */}
        <path
          d="M12 1.5L14.3 3.6L17.3 3.3L18.8 5.8L21.7 6.8L21.8 9.8L23.7 12L21.8 14.2L21.7 17.2L18.8 18.2L17.3 20.7L14.3 20.4L12 22.5L9.7 20.4L6.7 20.7L5.2 18.2L2.3 17.2L2.2 14.2L0.3 12L2.2 9.8L2.3 6.8L5.2 5.8L6.7 3.3L9.7 3.6L12 1.5Z"
          fill="url(#tiplyVerifiedGradient)"
          filter="url(#tiplyVerifiedGlow)"
        />

        {/* Crisp checkmark */}
        <path
          d="M8 12.2L10.7 14.9L16.2 9.4"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showLabel && (
        <span
          className={cn(
            cfg.text,
            'font-semibold text-emerald-800 tracking-tight',
            labelClassName
          )}
        >
          Verified
        </span>
      )}
    </span>
  );
};

VerifiedBadge.displayName = 'VerifiedBadge';
