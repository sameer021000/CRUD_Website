import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock } from 'lucide-react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import PasswordCriteria from '../../Components/Password_Criteria/PasswordCriteria';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { emailRegex, usernameRegex, checkPasswordCriteria, validateRequiredFields } from '../../Logic/ValidationRules';
import './SignUp.css';

const SignUp = () => {
  const { formData, errors, formStatus, isLoading, updateField, setErrors, setFormStatus, setIsLoading, clearStatus } = useFormLogic({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    uppercase: false, lowercase: false, number: false, specialChar: false, length: false
  });

  useEffect(() => {
    setPasswordCriteria(checkPasswordCriteria(formData.password));
  }, [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearStatus();
    const { newErrors, hasEmptyFields } = validateRequiredFields(formData, [
      'firstName', 'lastName', 'email', 'phone', 'username', 'password', 'confirmPassword'
    ]);

    if (!hasEmptyFields) {
      if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
      if (formData.phone.length !== 10) newErrors.phone = "Phone number must be exactly 10 digits";
      
      if (!usernameRegex.test(formData.username)) {
        newErrors.username = "Username must be 8-15 chars with letters and numbers";
      } else if (formData.username === formData.email) {
        newErrors.username = "Username cannot be the same as your email";
      } else if (formData.username === formData.phone) {
        newErrors.username = "Username cannot be the same as your phone number";
      }

      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (!Object.values(passwordCriteria).every(Boolean)) newErrors.password = "Password does not meet all criteria";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormStatus({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormStatus({ type: 'success', message: 'Account created successfully! Redirecting...' });
    }, 1500);
  };

  const footer = (
    <p>Already have an account? <Link to="/signin" className="auth-link">Sign In</Link></p>
  );

  return (
    <SharedScreenDesign 
      title="Create Account" 
      subtitle="Join CRUDMaster today"
      footer={footer}
      customClass="signup-page"
      formStatus={formStatus}
    >


      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="form-row">
          <InputField label="First Name" type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} placeholder="First Name" error={errors.firstName} />
          <InputField label="Last Name" type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} placeholder="Last Name" error={errors.lastName} />
        </div>
        <InputField label="Email" type="email" icon={Mail} value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Mail ID" error={errors.email} />
        <InputField label="Phone Number" type="tel" icon={Phone} prefix="+91" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone Number" error={errors.phone} />
        <InputField label="Username" type="text" icon={User} value={formData.username} onChange={(e) => updateField('username', e.target.value)} placeholder="Choose a username" error={errors.username} />
        
        <div className="password-section">
          <InputField label="Password" type="password" icon={Lock} value={formData.password} onChange={(e) => updateField('password', e.target.value)} placeholder="Create password" error={errors.password} isPassword defaultVisible={true} />
          {formData.password && <PasswordCriteria criteria={passwordCriteria} />}
        </div>

        <InputField label="Confirm Password" type="password" icon={Lock} value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} placeholder="Confirm password" error={errors.confirmPassword} isPassword defaultVisible={false} />
        <SubmitButton isLoading={isLoading} className="mt-4">Sign Up</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default SignUp;
