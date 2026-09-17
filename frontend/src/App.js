import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './Screens/Splash_Screen/SplashScreen';
import SignIn from './Screens/Sign_In/SignIn';
import SignUp from './Screens/Sign_Up/SignUp';

import ForgotPassword from './Screens/Forgot_Password/ForgotPassword';
import Dashboard from './Screens/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
