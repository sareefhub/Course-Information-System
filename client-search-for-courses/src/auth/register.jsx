import axios from "axios";
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Conf from "../config";
import Navbar from '../components/navbar/Navbar';
import './register.css'

const initialUser = { name: "", username: "", email: "", password: "", confirmPassword: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const signUp = async () => {
    try {
      const url = `${Conf.apiUrls}/auth/local/register`;
      if (!user.name || !user.username || !user.email || !user.password || !user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'สมัครล้มเหลว',
          text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        });
        return;
      }
  
      // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
      if (user.password !== user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'สมัครล้มเหลว',
          text: 'กรุณาตรวจสอบรหัสผ่านและยืนยันรหัสผ่านของคุณ',
        });
        return;
      }
  
      // ส่งคำขอสมัครผ่าน API
      const res = await axios.post(url, user);
      if (!!res) {
        setUser(initialUser);
        navigate("/login");
        Swal.fire({
          icon: 'success',
          title: 'สมัครสำเร็จ',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'สมัครล้มเหลว',
        text: 'กรุณาลองอีกครั้ง.',
      });
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="register-page">
        <div className="register-container">
          <div className="form-container">
            <h2>สมัครสมาชิก</h2>
            <div className="form-group">
              <label>ชื่อ :</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                placeholder="ชื่อ"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>บัญชีผู้ใช้ :</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUserChange}
                placeholder="บัญชีผู้ใช้"
                className="form-input"
              />
            </div>
            <div className="form-group">
            <label>อีเมลล์ :</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                placeholder="อีเมลล์"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>รหัสผ่าน :</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleUserChange}
                placeholder="รหัสผ่าน"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>ยืนยันรหัสผ่าน :</label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleUserChange}
                placeholder="ยืนยันรหัสผ่าน"
                className="form-input"
              />
            </div>
            <div className="ml-auto">
            <button className="register-btn-primary" onClick={signUp}>
              สมัครสมาชิก
            </button>
            </div>
            <div className="link-to-login">
              <div>มีบัญชีแล้ว <Link to="/login">เข้าสู่ระบบ</Link> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
