import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string | ReactNode;
  description?: string;
  extra?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  extra,
  className,
}: PageHeaderProps) => {
  return (
      
    
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-4', className)}>
      <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-950">
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {extra && (
        <div className="flex shrink-0 items-center">
          {extra}
        </div>
      )}
    </div>
  );
};
