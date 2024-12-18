import React from 'react';
import { cn } from '@/lib/utils';

export interface UserTagProps {
  name: string;
  type?: 'default' | 'admin' | 'member' | 'guest';
  className?: string;
}

const typeStyles = {
  default: 'bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800',
  admin: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900',
  member: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900',
  guest: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-900'
};

const avatarColors = {
  default: 'bg-zinc-200 dark:bg-zinc-700',
  admin: 'bg-blue-200 dark:bg-blue-800',
  member: 'bg-green-200 dark:bg-green-800',
  guest: 'bg-orange-200 dark:bg-orange-800'
};

export const UserTag: React.FC<UserTagProps> = ({
  name,
  type = 'default',
  className,
}) => {
  const firstChar = name.charAt(0).toUpperCase();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 pl-1 py-1 pr-3 text-xs font-medium border rounded-full',
        'select-none transition-colors',
        typeStyles[type],
        className
      )}
    >
      <span 
        className={cn(
          'flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-semibold',
          avatarColors[type]
        )}
      >
        {firstChar}
      </span>
      {name}
    </span>
  );
}; 