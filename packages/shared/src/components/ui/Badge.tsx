import React from 'react';
import { cn } from '../../lib/utils';

const defaultColorMap: Record<string, string> = {
  successful: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  paid: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  completed: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  active: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  available: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  verified: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  processing: 'bg-amber-50 text-amber-800 border-amber-200/60',
  pending: 'bg-amber-50 text-amber-800 border-amber-200/60',
  unsettled: 'bg-stone-100 text-stone-700 border-stone-200',
  failed: 'bg-rose-50 text-rose-800 border-rose-200/60',
  suspended: 'bg-rose-50 text-rose-800 border-rose-200/60',
  cancelled: 'bg-zinc-100 text-zinc-500 border-zinc-200',
};

const fallbackColor = 'bg-stone-100 text-zinc-700 border-stone-200';

function formatLabel(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface BadgeProps {
  status: string;
  label?: string;
  colorMap?: Record<string, string>;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  label,
  colorMap: customColorMap,
  className,
}) => {
  const effectiveColorMap = customColorMap ? { ...defaultColorMap, ...customColorMap } : defaultColorMap;
  const color = effectiveColorMap[status.toLowerCase()] ?? fallbackColor;
  const displayLabel = label ?? formatLabel(status);

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border', color, className)}>
      {displayLabel}
    </span>
  );
};

Badge.displayName = 'Badge';
