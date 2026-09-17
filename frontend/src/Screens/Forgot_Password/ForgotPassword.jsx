import React from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, Mail } from 'lucide-react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import CustomSelect from '../../Components/Custom_Select/CustomSelect';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { validateRequiredFields } from '../../Logic/ValidationRules';

const ForgotPassword = () => {
  const { formData, errors, formStatus, isLoading, updateField, setErrors, setFormStatus, setIsLoading, clearStatus } = useFormLogic({
    recoveryMethod: 'username',
    identifier: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearStatus();

    const { newErrors, hasEmptyFields } = validateRequiredFields(formData, ['identifier']);
    if (hasEmptyFields) {
      setErrors(newErrors);
      setFormStatus({ type: 'error', message: 'Please provide your account details.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormStatus({ type: 'success', message: 'Password reset link sent! Check your messages.' });
    }, 1500);
  };

  const getIcon = () => {
    if (formData.recoveryMethod === 'email') return Mail;
    if (formData.recoveryMethod === 'phone') return Phone;
    return User;
  };

  const getPlaceholder = () => {
    if (formData.recoveryMethod === 'email') return 'Email address';
    if (formData.recoveryMethod === 'phone') return 'Phone number';
    return 'Username';
  };

  const footer = (
    <p>Remembered your password? <Link to="/signin" className="auth-link">Sign In</Link></p>
  );

  return (
    <SharedScreenDesign 
      title="Reset Password" 
      subtitle="Enter your details to receive a recovery link"
      footer={footer}
      formStatus={formStatus}
    >

      
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <CustomSelect
          label="Recovery Method"
          options={[
            { value: 'username', label: 'Username' },
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone Number' }
          ]}
          value={formData.recoveryMethod}
          onChange={(value) => {
            updateField('recoveryMethod', value);
            updateField('identifier', ''); // Clear input on method change
          }}
        />

        <InputField 
          label={formData.recoveryMethod.charAt(0).toUpperCase() + formData.recoveryMethod.slice(1)}
          type={formData.recoveryMethod === 'email' ? 'email' : (formData.recoveryMethod === 'phone' ? 'tel' : 'text')}
          value={formData.identifier}
          onChange={(e) => updateField('identifier', e.target.value)}
          placeholder={getPlaceholder()}
          icon={getIcon()}
          prefix={formData.recoveryMethod === 'phone' ? '+91' : ''}
          error={errors.identifier}
        />
        
        <SubmitButton isLoading={isLoading} className="mt-4">Send Reset Link</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default ForgotPassword;
