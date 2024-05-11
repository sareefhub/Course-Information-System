import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from '../../auth/loginpsu/login';
import Loading from '../loader/Loader'
import './Navbar.css';

function Navbar() {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับ loading

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // เมื่อโหลดเสร็จแล้วกำหนดให้ loading เป็น false
    }, 500); // ในกรณีนี้ให้ทำการโหลดเป็นเวลา 300 มิลลิวินาที

    return () => clearTimeout(timer);
  }, []);


  if (loading) { // ถ้าโหลดอยู่ให้แสดง Loading component
    return <Loading />;
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/searchSubject">
          <img src={require("../../images/logo-psu.png")} alt="Logo" width="100px" height="40px"/>
          <span className="navbar-text-cis">CIS</span>
        </a>
        <span className="navbar-text">Course Information System</span>
        <input className="navbar-toggle"id="toggleChecker" type="checkbox" checked={isChecked} onChange={handleToggle} />
        <label id="togglerLable" htmlFor="toggleChecker">
          <div className="checkboxtoggler">
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </div>
        </label>
        <div className={`collapse navbar-collapse ml-auto ${isChecked ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/searchSubject">ค้นหารายวิชา</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/review">รีวิวรายวิชา</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/fanpage">แฟนเพจต่างๆ</a>
            </li>
          </ul>
          <div className="ml-auto">
          <LoginButton />
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
