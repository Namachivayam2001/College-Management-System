import React from 'react';

const StatsCard = ({ title, value, change, icon, type = 'default' }) => {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-number">{value}</p>
        {change && (
          <p className={`stat-change ${change.startsWith('↗') ? 'positive' : 'negative'}`}>
            {change}
          </p>
        )}
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

export default StatsCard;
