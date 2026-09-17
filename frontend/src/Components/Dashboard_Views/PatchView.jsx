import React from 'react';
import { Search } from 'lucide-react';
import InputField from '../Input_Field/InputField';
import SubmitButton from '../Submit_Button/SubmitButton';

const PatchView = () => {
  return (
    <div className="sub-view">
      <h3>Update User</h3>
      <InputField label="Target User (Username/Email)" type="text" placeholder="Who do you want to update?" icon={Search} />
      <div className="divider">Enter new values below (leave blank to keep current)</div>
      <InputField label="New Email" type="email" placeholder="New Mail ID" />
      <InputField label="New Phone" type="tel" placeholder="New Phone Number" prefix="+91" />
      <SubmitButton className="mt-2">Update User</SubmitButton>
    </div>
  );
};

export default PatchView;
