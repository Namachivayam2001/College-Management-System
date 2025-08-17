import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendType = 'neutral' }) => {
  const getTrendColor = () => {
    switch (trendType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trendType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <div className="stats-value">{value}</div>
        {trend && (
          <div className={`stats-trend ${getTrendColor()}`}>
            <span className="trend-icon">{getTrendIcon()}</span>
            <span className="trend-text">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
