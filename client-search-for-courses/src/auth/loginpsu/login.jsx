import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Conf from '../../config';
import './login.css';

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate();

  const accessTokenData = localStorage.getItem('accessToken');
  const accessToken = JSON.parse(accessTokenData);
  const user = accessToken && accessToken.accessToken && accessToken.accessToken.student && accessToken.accessToken.student.data[0].studentId;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    const authUrl = `${Conf.authUrl}?client_id=${Conf.clientId}&redirect_uri=${window.location.origin}/logincallback&response_type=code`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };


  useEffect(() => {
    const storedaccessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(storedaccessToken ? true : false);
  }, []);

  return (
    <div className="login-section">
      {isLoggedIn ? (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user}
          </button>
          <div className={`dropdown-menu${showDropdown ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
            <div className="dropdown-item" onClick={() => handleNavigation("/profile")}>Profile</div>
            <div className="dropdown-item logout-button" onClick={handleLogout}>
              ออกจากระบบ
            </div>
          </div>
        </div>
      ) : (
        <button className="btn-login" onClick={handleLogin}>เข้าสู่ระบบ</button>
      )}
    </div>
  );
};

export default LoginButton;
