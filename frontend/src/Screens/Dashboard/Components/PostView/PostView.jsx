import React from 'react';
import InputField from '../../../../Components/Input_Field/InputField';
import SubmitButton from '../../../../Components/Submit_Button/SubmitButton';
import './PostView.css';

const PostView = () => {
  return (
    <div className="sub-view">
      <h3>Create New User</h3>
      <div className="form-grid">
        <InputField label="First Name" type="text" placeholder="First Name" />
        <InputField label="Last Name" type="text" placeholder="Last Name" />
      </div>
      <InputField label="Email" type="email" placeholder="Mail ID" />
      <InputField label="Phone" type="tel" placeholder="Phone Number" prefix="+91" />
      <InputField label="Username" type="text" placeholder="Choose a username" />
      <SubmitButton className="mt-2">Create User</SubmitButton>
    </div>
  );
};

export default PostView;
