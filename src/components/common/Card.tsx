import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, gradient = false }) => {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-[#E2D9CD]/70 bg-white/70 backdrop-blur-md shadow-xs p-6 transition-all duration-300 hover:border-[#1C2541]/40 hover:shadow-md',
        gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#8A6C2E]/5 before:to-transparent before:pointer-events-none',
        className
      )}
    >
      {children}
    </div>
  );
};
