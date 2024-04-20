import React, { useState } from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">
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
              <a className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about-us">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/info">INFO</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
