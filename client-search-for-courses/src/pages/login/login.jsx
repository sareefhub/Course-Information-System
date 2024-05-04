// LoginButton.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config'; 

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    const authUrl = `${config.authUrl}?client_id=${config.clientId}&redirect_uri=${window.location.origin}/logincallback&response_type=code`;
    window.location.href = authUrl;
  };
  

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(`${config.accessTokenUrl}/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการออกจากระบบ:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>ออกจากระบบ</button>
      ) : (
        <button onClick={handleLogin}>เข้าสู่ระบบ โดย PSU PASSPORT</button>
      )}
    </div>
  );
};

export default LoginButton;
