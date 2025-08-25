import React from 'react';

interface ToProps {
  name: string;
  to: string;
  icon?: string;
  className?: string;
}

const To: React.FC<ToProps> = ({ name, to, icon, className = '' }) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline ${className}`}
    >
      {icon && <img src={icon} alt="" className="w-4 h-4" />}
      {name}
    </a>
  );
};

export default To;
