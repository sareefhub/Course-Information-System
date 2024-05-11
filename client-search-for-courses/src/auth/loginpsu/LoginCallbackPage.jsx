import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Conf from '../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const fetchAccessToken = async (code) => {
      try {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('client_id', Conf.clientId);
        formData.append('client_secret', Conf.clientSecret);
        formData.append('redirect_uri', `${window.location.origin}/logincallback`);
        formData.append('code', code);

        const response = await axios.post(Conf.accessTokenUrl, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.status === 200) {
          const accessToken = {
            token: response.data.access_token,
            student: null
          };

          const studentResponse = await axios.get(`${Conf.apiUrl}/level2/StudentDetail/token`, {
            headers: {
              'credential': `${Conf.apiKey}`,
              'token': accessToken.token
            },
          });

          accessToken.student = studentResponse.data;

          const expirationTime = Date.now() + (30 * 60 * 1000); 
          const dataToStore = {
            accessToken: accessToken,
            accessTokenExpiration: expirationTime
          };

          localStorage.setItem('accessToken', JSON.stringify(dataToStore));

          toast.success('เข้าสู่ระบบสำเร็จ');
          navigate('/');
        } else {
          console.error('เกิดข้อผิดพลาดในการรับ Access Token:', response.data);
          navigate('/');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับ Access Token:', error);
        navigate('/');
      }
    };

    const checkTokenExpiration = () => {
      const accessTokenString = localStorage.getItem('accessToken');
      if (accessTokenString) {
        const accessToken = JSON.parse(accessTokenString);
        const expirationTime = accessToken.accessTokenExpiration;
        if (expirationTime && Date.now() > parseInt(expirationTime)) {
          localStorage.removeItem('accessToken');
        }
      }
    };

    if (code) {
      fetchAccessToken(code);
    } else {
      navigate('/');
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
