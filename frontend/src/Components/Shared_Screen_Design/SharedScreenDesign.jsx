import React from 'react';
import './SharedScreenDesign.css';

const SharedScreenDesign = ({ title, subtitle, children, footer, customClass = '' }) => {
  return (
    <div className={`auth-page ${customClass}`}>
      <div className="auth-card">
        <div className="auth-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        
        {children}

        {footer && (
          <div className="auth-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedScreenDesign;
