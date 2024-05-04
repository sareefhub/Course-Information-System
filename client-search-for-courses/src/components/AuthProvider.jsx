import React, { createContext, useState, useContext } from 'react';

// สร้าง Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ฟังก์ชันสำหรับลงชื่อเข้าใช้
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // ฟังก์ชันสำหรับออกจากระบบ
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ฟังก์ชันสำหรับใช้ Context
export const useAuth = () => useContext(AuthContext);
