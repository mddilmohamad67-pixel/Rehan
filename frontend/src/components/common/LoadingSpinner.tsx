'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({
  size = 'md',
  message = 'Loading...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className={`${sizeClasses[size]} border-4 border-secondary border-t-primary rounded-full animate-spin`} />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
}
