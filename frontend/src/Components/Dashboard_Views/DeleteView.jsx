import React, { useState } from 'react';
import { Search } from 'lucide-react';
import InputField from '../Input_Field/InputField';
import SubmitButton from '../Submit_Button/SubmitButton';

const DeleteView = () => {
  const [deleteView, setDeleteView] = useState('specific'); // 'specific' | 'all'
  const [confirmDelete, setConfirmDelete] = useState('');

  return (
    <div className="sub-view">
      <div className="view-toggle danger">
        <button className={deleteView === 'specific' ? 'active' : ''} onClick={() => setDeleteView('specific')}>Delete Specific User</button>
        <button className={deleteView === 'all' ? 'active' : ''} onClick={() => setDeleteView('all')}>Delete All Users</button>
      </div>

      {deleteView === 'specific' ? (
        <div className="delete-section">
          <InputField 
            label="Target User (Username/Email)"
            type="text"
            icon={Search}
            placeholder="Who do you want to delete?"
          />
          <SubmitButton className="mt-2 bg-danger">Delete User</SubmitButton>
        </div>
      ) : (
        <div className="delete-section warning-box">
          <h3>⚠️ WARNING: COMPLETE DATA WIPE</h3>
          <p>This action will permanently delete ALL users from the database. This cannot be undone.</p>
          <InputField 
            label='Type "permanently delete all" to confirm'
            type="text"
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            placeholder="Type confirmation here..."
          />
          <SubmitButton 
            className="mt-2 bg-danger" 
            disabled={confirmDelete !== 'permanently delete all'}
          >
            Nuke Database
          </SubmitButton>
        </div>
      )}
    </div>
  );
};

export default DeleteView;
