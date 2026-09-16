import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const updateField = (field, value) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });
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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setFormStatus({ type: 'success', message: 'Signed in successfully! Redirecting...' });
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to CRUDMaster</p>
        </div>
        {formStatus.message && (
          <div className={`status-message ${formStatus.type}`}>
            {formStatus.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <InputField 
            label="Username / Email / Phone"
            type="text"
            value={formData.identifier}
            onChange={(e) => updateField('identifier', e.target.value)}
            placeholder="Enter your identifier"
            icon={User}
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

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
