import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ children, onClick, type = 'submit', className = '', isLoading = false }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`submit-btn ${className} ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      {isLoading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default SubmitButton;
