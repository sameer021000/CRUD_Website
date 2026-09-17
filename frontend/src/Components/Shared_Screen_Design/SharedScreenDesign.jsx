import React from 'react';
import './SharedScreenDesign.css';

const SharedScreenDesign = ({ title, subtitle, children, footer, customClass = '', formStatus = {} }) => {
  return (
    <div className={`auth-page ${customClass}`}>
      <div className="auth-card">
        <div className="auth-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        
        {formStatus.message && (
          <div className={`status-message ${formStatus.type}`}>
            {formStatus.message}
          </div>
        )}

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
