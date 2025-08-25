import React, { useContext } from 'react';
import { TabsContext } from './Tabs';

interface TabItemProps {
  children: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

const TabItem: React.FC<TabItemProps> = ({ children, value, label, className = '' }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    return <div className={className}>{children}</div>;
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <div className={className}>
      <button
        onClick={() => setActiveTab(value)}
        className={`px-4 py-2 border-b-2 ${
          isActive 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        {label}
      </button>
      {isActive && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default TabItem;
