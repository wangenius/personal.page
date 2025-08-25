import React from 'react';

interface PairsProps {
  children: React.ReactNode;
  className?: string;
}

const Pairs: React.FC<PairsProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {children}
    </div>
  );
};

export default Pairs;
