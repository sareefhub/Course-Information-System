import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config'; 

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    const authUrl = `${config.authUrl}?client_id=${config.clientId}&redirect_uri=${window.location.origin}/logincallback&response_type=code`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const storedaccessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(storedaccessToken ? true : false);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>ออกจากระบบ</button>
      ) : (
        <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      )}
    </div>
  );
};

export default LoginButton;
