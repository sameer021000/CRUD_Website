import React from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Phone, Mail } from 'lucide-react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import CustomSelect from '../../Components/Custom_Select/CustomSelect';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import './SignIn.css';

const SignIn = () => {
  const { formData, errors, formStatus, isLoading, updateField, setErrors, setFormStatus, setIsLoading, clearStatus } = useFormLogic({
    identifierType: 'username',
    identifier: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearStatus();
    const newErrors = {};

    let hasEmptyFields = false;
    ['identifier', 'password'].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        hasEmptyFields = true;
      }
    });

    if (hasEmptyFields) {
      setErrors(newErrors);
      setFormStatus({ type: 'error', message: 'Please enter your credentials.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormStatus({ type: 'success', message: 'Signed in successfully! Redirecting...' });
    }, 1500);
  };

  const getIcon = () => {
    if (formData.identifierType === 'email') return Mail;
    if (formData.identifierType === 'phone') return Phone;
    return User;
  };

  const getPlaceholder = () => {
    if (formData.identifierType === 'email') return 'Email address';
    if (formData.identifierType === 'phone') return 'Phone number';
    return 'Username';
  };

  const footer = (
    <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
  );

  return (
    <SharedScreenDesign 
      title="Welcome Back" 
      subtitle="Sign in to continue to CRUDMaster"
      footer={footer}
    >
      {formStatus.message && (
        <div className={`status-message ${formStatus.type}`}>
          {formStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <CustomSelect
          label="Login Method"
          options={[
            { value: 'username', label: 'Username' },
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone Number' }
          ]}
          value={formData.identifierType}
          onChange={(value) => {
            updateField('identifierType', value);
            updateField('identifier', ''); // Clear field on change
          }}
        />

        <InputField 
          label={formData.identifierType.charAt(0).toUpperCase() + formData.identifierType.slice(1)}
          type={formData.identifierType === 'email' ? 'email' : (formData.identifierType === 'phone' ? 'tel' : 'text')}
          value={formData.identifier}
          onChange={(e) => updateField('identifier', e.target.value)}
          placeholder={getPlaceholder()}
          icon={getIcon()}
          prefix={formData.identifierType === 'phone' ? '+91' : ''}
          error={errors.identifier}
        />
        
        <InputField 
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          placeholder="Enter your password"
          icon={Lock}
          error={errors.password}
          isPassword
          defaultVisible={false}
        />
        
        <div className="auth-options">
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        </div>

        <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default SignIn;
