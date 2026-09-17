import React, { useState } from 'react';
import { Users, User, Mail, Phone } from 'lucide-react';
import InputField from '../../../../Components/Input_Field/InputField';
import SubmitButton from '../../../../Components/Submit_Button/SubmitButton';
import CustomSelect from '../../../../Components/Custom_Select/CustomSelect';
import './GetView.css';

const GetView = () => {
  const [getView, setGetView] = useState('all'); // 'all' | 'search'
  
  const [getSearchType, setGetSearchType] = useState('username');
  const [getSearchTerm, setGetSearchTerm] = useState('');
  const [getSearchError, setGetSearchError] = useState('');
  const [fetchedUser, setFetchedUser] = useState(null);

  const handleFetchUser = (e) => {
    e.preventDefault();
    if (!getSearchTerm) {
      setGetSearchError("This field is required");
      setFetchedUser(null);
      return;
    }
    setGetSearchError('');
    
    // Mock user response
    setFetchedUser({
      fullName: 'John Doe',
      username: getSearchType === 'username' ? getSearchTerm : 'johndoe99',
      email: getSearchType === 'email' ? getSearchTerm : 'john.doe@example.com',
      phone: getSearchType === 'phone' ? getSearchTerm : '9876543210'
    });
  };

  return (
    <div className="sub-view">
      <div className="view-toggle">
        <button className={getView === 'all' ? 'active' : ''} onClick={() => setGetView('all')}>View All Users</button>
        <button className={getView === 'search' ? 'active' : ''} onClick={() => setGetView('search')}>Search User</button>
      </div>
      
      {getView === 'all' ? (
        <div className="data-grid">
          {/* Mock data grid */}
          <div className="mock-user-card"><Users size={32}/> <p>John Doe</p></div>
          <div className="mock-user-card"><Users size={32}/> <p>Jane Smith</p></div>
          <div className="mock-user-card"><Users size={32}/> <p>Alice Johnson</p></div>
        </div>
      ) : (
        <form className="search-section" onSubmit={handleFetchUser}>
          <CustomSelect 
            label="Search Method"
            options={[
              { value: 'username', label: 'Username' },
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone Number' }
            ]}
            value={getSearchType}
            onChange={(val) => {
              setGetSearchType(val);
              setGetSearchTerm('');
              setGetSearchError('');
              setFetchedUser(null);
            }}
          />
          <InputField 
            label={getSearchType.charAt(0).toUpperCase() + getSearchType.slice(1)}
            type={getSearchType === 'email' ? 'email' : getSearchType === 'phone' ? 'tel' : 'text'}
            icon={getSearchType === 'email' ? Mail : getSearchType === 'phone' ? Phone : User}
            value={getSearchTerm}
            onChange={(e) => {
              setGetSearchTerm(e.target.value);
              setGetSearchError('');
            }}
            placeholder={`Enter ${getSearchType}`}
            prefix={getSearchType === 'phone' ? '+91' : undefined}
            error={getSearchError}
          />
          <SubmitButton className="mt-2">Fetch User</SubmitButton>

          {fetchedUser && (
            <div className="fetched-user-card fadeIn mt-4">
              <h4>User Details</h4>
              <div className="detail-row">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">{fetchedUser.fullName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Username:</span>
                <span className={`detail-value ${getSearchType !== 'username' ? 'blurred-text' : ''}`}>{fetchedUser.username}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className={`detail-value ${getSearchType !== 'email' ? 'blurred-text' : ''}`}>{fetchedUser.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className={`detail-value ${getSearchType !== 'phone' ? 'blurred-text' : ''}`}>+91 {fetchedUser.phone}</span>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default GetView;
