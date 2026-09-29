import tiplyLogo from '../../assets/images/logo.png';
import { cn } from '../../lib/utils';

export type ILogoProps = {
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  variant?: 'light' | 'dark';
};

export const Logo = ({
  className,
  label = 'tiply.ng',
  size = 'md',
  iconOnly = false,
  variant = 'light',
}: ILogoProps) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const containerSizes = {
    sm: 'size-7',
    md: 'size-9',
    lg: 'size-11',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-sans font-bold select-none group',
        isDark ? 'text-white' : 'text-zinc-950',
        className
      )}
    >
      {/* Precision Kinetic T Mark */}
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface ring-1 ring-zinc-900/5 transition-transform duration-200 group-hover:scale-105',
          containerSizes[size]
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(iconSizes[size], 'transition-transform duration-200')}
        >
          <defs>
            <linearGradient id={`tiply-shared-emerald-${size}`} x1="24.5" y1="27.5" x2="54.5" y2="7.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor={isDark ? '#34D399' : '#10B981'} />
            </linearGradient>
          </defs>
          {/* Emerald Kinetic Swoop (Layer 1 - Underneath Stem) */}
          <path
            d="M 24.5 27.5 C 32 27.5 39.5 22.5 46 16"
            stroke={`url(#tiply-shared-emerald-${size})`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          {/* Nigerian Emerald Domain Beacon */}
          <circle
            cx="54.5"
            cy="7.5"
            r="4.5"
            fill={isDark ? '#34D399' : '#10B981'}
            className="transition-transform duration-300 ease-out group-hover:scale-125 origin-center"
          />
          {/* Obsidian / White Stem & Hook (Layer 2 - Over Swoop) */}
          <path
            d="M 24.5 12 V 38 C 24.5 44.5 29.5 48.5 38 48.5"
            stroke={isDark ? '#FFFFFF' : '#09090B'}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Crossbar */}
          <path
            d="M 11 27.5 H 24.5"
            stroke={isDark ? '#FFFFFF' : '#09090B'}
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {!iconOnly && (
        <span className={cn('flex items-center tracking-tight leading-none', textSizes[size])}>
          <span>{label.replace('.ng', '')}</span>
          <span className="text-emerald-600 transition-transform duration-200 group-hover:scale-105">.ng</span>
        </span>
      )}
    </span>
  );
};
