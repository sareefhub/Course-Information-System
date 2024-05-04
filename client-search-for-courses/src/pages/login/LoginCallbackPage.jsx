import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'; 

const LoginCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const fetchAccessToken = async (code) => {
      try {
        const response = await axios.post(config.accessTokenUrl, {
          grant_type: 'authorization_code',
          client_id: config.clientId,
          client_secret: config.clientSecret,
          redirect_uri: `${window.location.origin}/logincallback`,
          code: code,
        });
      
        const accessToken = response.data.access_token;
        localStorage.setItem('accessToken', accessToken);
        navigate('/');
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับ Access Token:', error);
        navigate('/login');
      }
    };

    if (code) {
      fetchAccessToken(code);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <p>กำลังดำเนินการล็อกอิน...</p>
    </div>
  );
};

export default LoginCallbackPage;
