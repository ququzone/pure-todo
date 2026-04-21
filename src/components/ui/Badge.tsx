import React from 'react';

type Priority = 'low' | 'medium' | 'high';

interface BadgeProps {
  priority: Priority;
  text: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ priority, text, className = '' }) => {
  const priorityStyles = {
    low: 'bg-gray-100 text-gray-700 border-gray-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${priorityStyles[priority]} ${className}`}>
      {text}
    </span>
  );
};
