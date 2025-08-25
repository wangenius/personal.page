import React from 'react';

interface TagProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, color = 'blue', className = '' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
