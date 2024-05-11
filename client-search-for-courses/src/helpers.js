// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {fetchAccessToken} from './auth/loginpsu/LoginCallbackPage'
  
//   export const Protector = ({ Component, ...rest }) => {
//     const navigate = useNavigate();
  
//     const { accessToken } = fetchAccessToken();
  
//     useEffect(() => {
//       if (!accessToken) {
//         navigate("/login");
//       }
//     }, [navigate, accessToken]);
  
//     return <Component {...rest} />;
//   };