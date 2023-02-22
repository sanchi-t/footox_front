import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import GoogleOneTapLogin from 'react-google-one-tap-login';
import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { useState,useEffect } from "react";



const clientId='907385226953-mc9c2r4j8t9nmne9dch68s65tmkq2gqg.apps.googleusercontent.com'

const GLogin=({ setGLogin })=>{
    async function GoogleLoginSucc(credentialResponse){
        // console.log('credentialResponse',credentialResponse);
        const payload=credentialResponse.credential;
        var obj = jwt_decode(credentialResponse.credential);
        // localStorage.setItem('jwtToken', credentialResponse.credential);
        var data = JSON.stringify(obj);
        localStorage.setItem('user', data);

        if(!localStorage.getItem('jwtToken')){
          axios({
            method: 'post',
            url: 'http://localhost:4000/googlelogin',
            data: {payload}, // you are sending body instead
            headers: {
             // 'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
            }, 
          }).then(response=>{
            if(response.status===200 || response.status===201){
                localStorage.setItem('jwtToken', response.data.token);
                var data = JSON.stringify(response.data);
                localStorage.setItem('all', data);
                setGLogin(obj);
                window.location.reload();
            }
            console.log(response);
          })
  }
        
        
        //   setGLogin(obj);
        // setGoogle(true);
       
      }
    return(
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
 
                onSuccess={GoogleLoginSucc}
                onFailure={(error) => console.log(error)}
                />
        </GoogleOAuthProvider>
    );
}


const GOneTapLogin=({ chooseonetap })=>{
    async function GoogleLoginSucc(data){
        // console.log(data);
        // chooseonetap(data);
        // console.log('credentialResponse',credentialResponse);
        const payload=data;
        // var obj = jwt_decode(credentialResponse.credential);
        // localStorage.setItem('jwtToken', credentialResponse.credential);
        var obj = JSON.stringify(data);
        localStorage.setItem('user', obj);
        if(!localStorage.getItem('jwtToken')){
          axios({
            method: 'post',
            url: 'http://localhost:4000/googleloginonetap',
            data: {payload}, // you are sending body instead
            headers: {
             // 'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
            }, 
          }).then(response=>{
            if(response.status===200 || response.status===201){
                localStorage.setItem('jwtToken', response.data.token);
                var data = JSON.stringify(response.data);
                localStorage.setItem('all', data);
                chooseonetap(data);
                window.location.reload();
            }
            console.log(response);
          })
          
  }
        
        
        
        //   setGLogin(obj);
        // setGoogle(true);
       
      }
    
    
    return(
        <GoogleOneTapLogin onError={(error) => console.log(error)} onSuccess={GoogleLoginSucc} googleAccountConfigs={{ client_id:'907385226953-mc9c2r4j8t9nmne9dch68s65tmkq2gqg.apps.googleusercontent.com'}} />

    );
}



export {GLogin,GOneTapLogin};