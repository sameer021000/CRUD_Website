import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Edit3, Trash2, LogOut, Users } from 'lucide-react';
import BentoCard from '../../Components/Bento_Card/BentoCard';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  // Sub-view states
  const [getView, setGetView] = useState('all'); // 'all' | 'search'
  const [deleteView, setDeleteView] = useState('specific'); // 'specific' | 'all'

  // Generic form state for demo
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');

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
        <div className="search-section">
          <InputField 
            label="Search by Username or Email"
            type="text"
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <SubmitButton className="mt-2">Fetch User</SubmitButton>
        </div>
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
