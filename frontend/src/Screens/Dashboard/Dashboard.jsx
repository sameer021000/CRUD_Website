import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Edit3, Trash2, LogOut } from 'lucide-react';
import BentoCard from './Components/BentoCard/BentoCard';
import GetView from './Components/GetView/GetView';
import PostView from './Components/PostView/PostView';
import PatchView from './Components/PatchView/PatchView';
import DeleteView from './Components/DeleteView/DeleteView';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  const handleLogout = () => {
    // In a real app, clear tokens here
    navigate('/signin');
  };

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
              <GetView />
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
              <PostView />
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
              <PatchView />
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
              <DeleteView />
            </BentoCard>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
