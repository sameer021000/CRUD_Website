import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CustomSelect.css';

const CustomSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="input-group custom-select-container" ref={wrapperRef}>
      {label && <label className={`input-label ${isOpen ? 'focused-label' : ''}`}>{label}</label>}
      <div 
        className={`custom-select-box ${isOpen ? 'select-open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-text">{selectedOption.label}</span>
        <ChevronDown className={`select-chevron ${isOpen ? 'chevron-up' : ''}`} size={20} />
      </div>
      
      {isOpen && (
        <div className="select-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${option.value === value ? 'option-active' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
