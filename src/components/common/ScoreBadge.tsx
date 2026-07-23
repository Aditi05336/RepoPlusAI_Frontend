import React from 'react';
import { getScoreColor } from '../../utils/formatters';
import { clsx } from 'clsx';

interface ScoreBadgeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, label, size = 'md' }) => {
  const colors = getScoreColor(score);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1 font-semibold',
    lg: 'text-base px-4 py-1.5 font-bold',
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      {label && <span className="text-xs text-slate-400 font-medium">{label}:</span>}
      <span
        className={clsx(
          'inline-flex items-center justify-center rounded-full border shadow-sm font-mono',
          colors.badge,
          sizeClasses[size]
        )}
      >
        {score}/100
      </span>
    </div>
  );
};
