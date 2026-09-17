import React from 'react';
import './BentoCard.css';

const BentoCard = ({ title, description, icon: Icon, colorClass, isActive, onClick, children }) => {
  if (isActive) {
    return (
      <div className={`bento-card expanded ${colorClass}`}>
        <div className="bento-card-header" onClick={onClick}>
          <div className="bento-card-title-group">
            <div className="icon-wrapper">
              <Icon size={24} />
            </div>
            <h3>{title}</h3>
          </div>
          <button className="close-btn" onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}>✕</button>
        </div>
        <div className="bento-card-content fadeIn">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`bento-card collapsed ${colorClass}`} onClick={onClick}>
      <div className="icon-wrapper">
        <Icon size={32} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default BentoCard;
