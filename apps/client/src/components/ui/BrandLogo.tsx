import React from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  iconOnly?: boolean;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  asLink = true,
  iconOnly = false,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  const sizeClasses = {
    sm: 'text-base tracking-tight gap-1.5',
    md: 'text-xl tracking-tight gap-2',
    lg: 'text-2xl tracking-tight gap-2.5',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const content = (
    <span
      className={`inline-flex items-center font-bold lowercase select-none group font-sans ${isDark ? 'text-white' : 'text-zinc-950'} ${sizeClasses[size]} ${className}`}
    >
      {/* The Kinetic T Mark */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`tiply-emerald-${size}-${variant}`} x1="24.5" y1="27.5" x2="54.5" y2="7.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor={isDark ? '#34D399' : '#10B981'} />
          </linearGradient>
        </defs>
        {/* Emerald Kinetic Swoop (Layer 1 - Underneath Stem) */}
        <path
          d="M 24.5 27.5 C 32 27.5 39.5 22.5 46 16"
          stroke={`url(#tiply-emerald-${size}-${variant})`}
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
        {/* Obsidian/White Stem & Hook (Layer 2 - Over Swoop) */}
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

      {!iconOnly && (
        <span className="flex items-center tracking-tight">
          <span>tiply</span>
          <span className="text-emerald-600 transition-transform duration-200 group-hover:scale-105">.ng</span>
        </span>
      )}
    </span>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link to="/" className="inline-flex items-center focus:outline-hidden">
      {content}
    </Link>
  );
};
