import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, CheckCircle2, Circle } from 'lucide-react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import '../Sign_In/SignIn.css'; // Reusing some auth styles
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const [passwordCriteria, setPasswordCriteria] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false
  });

  const updateField = (field, value) => {
    // Clear error when typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (field === 'phone') {
      // Remove any non-digit character and limit to 10 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [field]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    const pwd = formData.password;
    setPasswordCriteria({
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      specialChar: /[^A-Za-z0-9]/.test(pwd),
      length: pwd.length >= 8 && pwd.length <= 15
    });
  }, [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });
    const newErrors = {};

    // Required fields validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'username', 'password', 'confirmPassword'];
    let hasEmptyFields = false;
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        hasEmptyFields = true;
      }
    });

    if (!hasEmptyFields) {
      // Email validation: must have . after @ and text after .
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

    // Phone validation
    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

      // Username validation: 8-15 chars, at least one alphabet, at least one number
      const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
      if (!usernameRegex.test(formData.username)) {
        newErrors.username = "Username must be 8-15 chars with letters and numbers";
      } else if (formData.username === formData.email) {
        newErrors.username = "Username cannot be the same as your email";
      } else if (formData.username === formData.phone) {
        newErrors.username = "Username cannot be the same as your phone number";
      }

      // Password match
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      
      // Password criteria
      const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
      if (!allCriteriaMet) {
        newErrors.password = "Password does not meet all criteria";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormStatus({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setFormStatus({ type: 'success', message: 'Account created successfully! Redirecting...' });
    }, 1500);
  };

  const CriterionItem = ({ met, text }) => (
    <div className={`criterion-item ${met ? 'met' : ''}`}>
      {met ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="auth-page signup-page">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join CRUDMaster today</p>
        </div>
        
        {formStatus.message && (
          <div className={`status-message ${formStatus.type}`}>
            {formStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-row">
            <InputField 
              label="First Name" type="text"
              value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)}
              placeholder="First Name"
              error={errors.firstName}
            />
            <InputField 
              label="Last Name" type="text"
              value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)}
              placeholder="Last Name"
              error={errors.lastName}
            />
          </div>

          <InputField 
            label="Email" type="email" icon={Mail}
            value={formData.email} onChange={(e) => updateField('email', e.target.value)}
            placeholder="Mail ID"
            error={errors.email}
          />

          <InputField 
            label="Phone Number" type="tel" icon={Phone} prefix="+91"
            value={formData.phone} onChange={(e) => updateField('phone', e.target.value)}
            placeholder="Phone Number"
            error={errors.phone}
          />

          <InputField 
            label="Username" type="text" icon={User}
            value={formData.username} onChange={(e) => updateField('username', e.target.value)}
            placeholder="Choose a username"
            error={errors.username}
          />
          
          <div className="password-section">
            <InputField 
              label="Password" type="password" icon={Lock}
              value={formData.password} onChange={(e) => updateField('password', e.target.value)}
              placeholder="Create password"
              error={errors.password}
              isPassword
              defaultVisible={true}
            />
            
            {formData.password && (
              <div className="password-criteria-box">
                <CriterionItem met={passwordCriteria.uppercase} text="Upper case letter" />
                <CriterionItem met={passwordCriteria.lowercase} text="Lower case letter" />
                <CriterionItem met={passwordCriteria.number} text="Numerical digit" />
                <CriterionItem met={passwordCriteria.specialChar} text="Special character" />
                <CriterionItem met={passwordCriteria.length} text="8 to 15 characters" />
              </div>
            )}
          </div>

          <InputField 
            label="Confirm Password" type="password" icon={Lock}
            value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)}
            placeholder="Confirm password"
            error={errors.confirmPassword}
            isPassword
            defaultVisible={false}
          />

          <SubmitButton isLoading={isLoading} className="mt-4">Sign Up</SubmitButton>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/signin" className="auth-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
