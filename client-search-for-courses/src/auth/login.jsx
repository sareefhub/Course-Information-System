import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeUser } from "../helpers";
import LoginButton from '../pages/login/login';
import Conf from "../config";
import Swal from 'sweetalert2';

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `${Conf.apiUrls}/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          setUser(initialUser);
          navigate("/");
          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'การเข้าสู่ระบบล้มเหลว',
        text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง.',
      });
    }
  };


  return (
    <div className="login">
      <h2>Login:</h2>
      <div>
        <input
          type="email"
          name="identifier"
          value={user.identifier}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>
      <button className="ml-auto" onClick={handleLogin}>
        Login
      </button>
      <div className="ml-auto">
            <LoginButton />
      </div>
    </div>
  );
};

export default Login;
