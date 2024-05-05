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
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('client_id', config.clientId);
        formData.append('client_secret', config.clientSecret);
        formData.append('redirect_uri', `${window.location.origin}/logincallback`);
        formData.append('code', code);

        const response = await axios.post(config.accessTokenUrl, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.status === 200) {
          const accessToken = response.data.access_token;
          const expirationTime = Date.now() + (30 * 60 * 1000); 
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('accessTokenExpiration', expirationTime);
          navigate('/');
        } else {
          console.error('เกิดข้อผิดพลาดในการรับ Access Token:', response.data);
          navigate('/login');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับ Access Token:', error);
        navigate('/login');
      }
    };

    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('accessTokenExpiration');
      if (expirationTime && Date.now() > parseInt(expirationTime)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiration');
      }
    };

    if (code) {
      fetchAccessToken(code);
    } else {
      navigate('/login');
    }

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div>
      <p>กำลังดำเนินการล็อกอิน...</p>
    </div>
  );
};

export default LoginCallbackPage;
