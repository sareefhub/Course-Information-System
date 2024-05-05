import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const userData = () => {
    return localStorage.getItem("accessToken") || '';
  };
  

export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = userData();
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]); 

  return <Component />; 
};
