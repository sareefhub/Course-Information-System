import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fetchAccessToken = () => {
  return {
    accessToken: localStorage.getItem("accessToken")
  };
};

export const Protector = ({ Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { accessToken } = fetchAccessToken();
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return <Component {...rest} />;
};
