import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './InputField.css';

const InputField = ({ label, type, value, onChange, placeholder, icon: Icon, required, error, prefix, isPassword, defaultVisible = false }) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  
  const inputType = isPassword ? (isVisible ? 'text' : 'password') : type;

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon className={`input-icon ${error ? 'icon-error' : ''}`} size={20} />}
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`custom-input ${Icon ? 'with-icon' : ''} ${prefix ? 'with-prefix' : ''} ${isPassword ? 'with-password-toggle' : ''} ${error ? 'input-error' : ''}`}
        />
        {isPassword && (
          <button 
            type="button" 
            className="password-toggle" 
            onClick={() => setIsVisible(!isVisible)}
            tabIndex="-1"
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
