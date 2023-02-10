import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';

// const createToken = (id) => {
//     return jwt.sign({ id }, '$foo9Yr$0Bt#toxOONasa-WebD', {
//       expiresIn: maxAge
//     });
//   };

const Authentication = ({ children }) => {
    console.log('authh')

    let token = localStorage.getItem('jwtToken');
    axios.post("http://localhost:4000/auth",{'jwt':token})
    .then((res) => {
      console.log(res);
    })
    .then((err) => {
      console.log(err);
    });
    // const location = useLocation();
    // const auth = useSelector((store) => store.AuthReducer.isAuth);
    // if (!auth) {
    //     return <Navigate to="/login" replace state={{ from: location }} />;
    // }
    return children;
};

export default Authentication;
