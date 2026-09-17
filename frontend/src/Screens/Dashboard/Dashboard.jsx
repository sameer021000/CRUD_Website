import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Edit3, Trash2, LogOut, Users, User, Mail, Phone } from 'lucide-react';
import BentoCard from '../../Components/Bento_Card/BentoCard';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import CustomSelect from '../../Components/Custom_Select/CustomSelect';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  // Sub-view states
  const [getView, setGetView] = useState('all'); // 'all' | 'search'
  const [deleteView, setDeleteView] = useState('specific'); // 'specific' | 'all'

  // Generic form state for demo
  const [confirmDelete, setConfirmDelete] = useState('');

  // Get Search state
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

  const handleLogout = () => {
    // In a real app, clear tokens here
    navigate('/signin');
  };

  const renderGetContent = () => (
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

  const renderPostContent = () => (
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

  const renderPatchContent = () => (
    <div className="sub-view">
      <h3>Update User</h3>
      <InputField label="Target User (Username/Email)" type="text" placeholder="Who do you want to update?" icon={Search} />
      <div className="divider">Enter new values below (leave blank to keep current)</div>
      <InputField label="New Email" type="email" placeholder="New Mail ID" />
      <InputField label="New Phone" type="tel" placeholder="New Phone Number" prefix="+91" />
      <SubmitButton className="mt-2">Update User</SubmitButton>
    </div>
  );

  const renderDeleteContent = () => (
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

  return (
    <div className="dashboard-page">
      {/* Top Navbar / Floating element */}
      <div className="dashboard-nav">
        <h2>CRUD<span className="text-primary">Master</span></h2>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <div className="dashboard-container">
        <div className={`bento-grid ${activeCard ? 'has-active' : ''}`}>
          
          {(!activeCard || activeCard === 'GET') && (
            <BentoCard 
              title="Read Data" 
              description="Fetch all users or find a specific profile"
              icon={Search}
              colorClass="bento-blue"
              isActive={activeCard === 'GET'}
              onClick={() => setActiveCard(activeCard === 'GET' ? null : 'GET')}
            >
              {renderGetContent()}
            </BentoCard>
          )}

          {(!activeCard || activeCard === 'POST') && (
            <BentoCard 
              title="Create User" 
              description="Add a brand new user to the database"
              icon={PlusCircle}
              colorClass="bento-violet"
              isActive={activeCard === 'POST'}
              onClick={() => setActiveCard(activeCard === 'POST' ? null : 'POST')}
            >
              {renderPostContent()}
            </BentoCard>
          )}

          {(!activeCard || activeCard === 'PATCH') && (
            <BentoCard 
              title="Update User" 
              description="Modify existing user information"
              icon={Edit3}
              colorClass="bento-pink"
              isActive={activeCard === 'PATCH'}
              onClick={() => setActiveCard(activeCard === 'PATCH' ? null : 'PATCH')}
            >
              {renderPatchContent()}
            </BentoCard>
          )}

          {(!activeCard || activeCard === 'DELETE') && (
            <BentoCard 
              title="Delete Data" 
              description="Remove a specific user or wipe the entire database"
              icon={Trash2}
              colorClass="bento-red"
              isActive={activeCard === 'DELETE'}
              onClick={() => setActiveCard(activeCard === 'DELETE' ? null : 'DELETE')}
            >
              {renderDeleteContent()}
            </BentoCard>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
