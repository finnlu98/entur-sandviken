import { useState } from 'react';
import './tab.css';

export interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  defaultActiveIndex?: number;
}

const Tab: React.FC<TabProps> = ({ tabs, defaultActiveIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]?.content}</div>
    </div>
  );
};

export default Tab;
