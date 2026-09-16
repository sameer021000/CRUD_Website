import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database } from 'lucide-react';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="icon-container">
          <Database size={64} className="splash-icon" />
        </div>
        <h1 className="splash-title">CRUD<span className="splash-highlight">Master</span></h1>
        <p className="splash-subtitle">Manage your data seamlessly</p>
      </div>
      <div className="splash-loader"></div>
    </div>
  );
};

export default SplashScreen;
