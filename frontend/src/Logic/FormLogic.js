import { useState } from 'react';
import { formatPhoneNumber } from './ValidationRules';

export const useFormLogic = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (field === 'phone') {
      const digitsOnly = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [field]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const setManualError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const clearStatus = () => setFormStatus({ type: '', message: '' });

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    formStatus,
    setFormStatus,
    isLoading,
    setIsLoading,
    updateField,
    setManualError,
    clearStatus
  };
};
