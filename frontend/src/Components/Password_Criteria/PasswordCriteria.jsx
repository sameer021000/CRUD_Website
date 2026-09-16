import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import './PasswordCriteria.css';

const CriterionItem = ({ met, text }) => (
  <div className={`criterion-item ${met ? 'met' : ''}`}>
    {met ? <CheckCircle2 size={16} /> : <Circle size={16} />}
    <span>{text}</span>
  </div>
);

const PasswordCriteria = ({ criteria }) => {
  return (
    <div className="password-criteria-box">
      <CriterionItem met={criteria.uppercase} text="Upper case letter" />
      <CriterionItem met={criteria.lowercase} text="Lower case letter" />
      <CriterionItem met={criteria.number} text="Numerical digit" />
      <CriterionItem met={criteria.specialChar} text="Special character" />
      <CriterionItem met={criteria.length} text="8 to 15 characters" />
    </div>
  );
};

export default PasswordCriteria;
