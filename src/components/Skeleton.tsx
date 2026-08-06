import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect'
}) => {
  const baseStyles = 'animate-pulse bg-slate-200';
  
  const variants = {
    text: 'h-4 w-full rounded-md',
    rect: 'w-full rounded-lg',
    circle: 'rounded-full shrink-0'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
};
