import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { storeUser } from "../helpers";
import LoginButton from './loginpsu/login';
import Conf from "../config";
import Swal from 'sweetalert2';
import Navbar from '../components/navbar/Navbar';
import './login.css'


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
    <div className="login-container">
      <Navbar />
      <div className="login-form">
        <h2>เข้าสู่ระบบ</h2>
        <div>
          <label>อีเมล :</label>
          <input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Enter your email"
            />
        </div>
        <div>
          <label>รหัสผ่าน :</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div className="ml-auto">
          <button  onClick={handleLogin}>Login</button>
        </div>
        <div className="link-to-register">
              <div>ยังไม่มีบัญชีใช่ไหม? <Link to="/register">สมัครตรงนี้</Link> </div>
        </div>
        <hr />
        <div className="ml-auto">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
