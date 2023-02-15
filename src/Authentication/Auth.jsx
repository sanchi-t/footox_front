import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Authentication = ({ children }) => {
    const navigate = useNavigate();
    console.log('authh',navigate(-1));

    const isLoggedIn=localStorage.getItem('jwtToken');
    
    if(isLoggedIn){
      return children;
    }
    else{
      // window.location.reload();
      return <Navigate to="/" />; 
         }
    
};

export default Authentication;
