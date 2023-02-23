import React, { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Avatar=()=> {


    let navigate=useNavigate();
    const profileText=localStorage.getItem('user');
    let profile; 
  
    if(profileText!==null){
      console.log(profileText,'ji');
      profile=JSON.parse(profileText);
    }
    // console.log(profile?.picture)
    let email = localStorage.getItem('userInfo');
    // console.log(email);

    let username = localStorage.getItem('username');
    const logoutHandler = () => {
        console.log('deleted here');
        localStorage.clear();
        // sessionStorage.clear();
        window.location.reload();
        sessionStorage.removeItem('coupon');
        sessionStorage.removeItem('items');
        sessionStorage.removeItem('quantity');
        sessionStorage.removeItem('total');
        window.location.reload();
        }
    const handleWishlist = () =>{
      navigate('/showWishlist',{state:{email:email}});
  }
    const handleProfile = () =>{
      navigate('/showProfile',{state:{email:email}});
  }
  const handlePreviousOrder = () =>{
    navigate('/showProducts', {state:{email:email}})
  }
    // console.log(chooseMessage);
    // window.location.reload();

    return(<>
        <Menu>
        <MenuButton
              as={Button}
              style={{backgroundColor: '#FFFFFF',border: 'none',margin:'0px',paddingRight:'0px',paddingLeft:'5px'}}
              rightIcon={<AiFillCaretDown  style={{width:'70%', color: 'black',float:'left'}} />}>
                {(localStorage.getItem('user')) &&
                  <img style={{height:'50px',borderRadius: '50%'}} src={`${JSON.parse(localStorage.getItem('user')).picture}`} alt="avatar" />
                }
                {(!profile) &&

                  <img style={{height:'50px',borderRadius: '50%'}} src={`https://api.dicebear.com/5.x/initials/svg?seed=${username}`} alt="avatar" />
                }
            </MenuButton>
            <MenuList>
              <MenuItem as={"Button"} style={{color:'White',backgroundColor:'#2fb675',fontSize: '17px',padding:'10px 20px',borderRadius: '5px'}}  onClick={logoutHandler}>
                Logout
              </MenuItem>
               <MenuItem as={"Button"} style={{color:'White',backgroundColor:'#2fb675',fontSize: '17px',padding:'10px 20px',borderRadius: '5px'}}  onClick={handleWishlist} >
                Whislist
              </MenuItem>
              <MenuItem as={"Button"} style={{color:'White',backgroundColor:'#2fb675',fontSize: '17px',padding:'10px 20px',borderRadius: '5px'}}  onClick={handlePreviousOrder} >
                Orders
              </MenuItem>
              <MenuItem as={"Button"} style={{color:'White',backgroundColor:'#2fb675',fontSize: '17px',padding:'10px 20px',borderRadius: '5px'}}  onClick={handleProfile} >
                My Profile
              </MenuItem>
            </MenuList>
        </Menu>
            {/* <img style={{height:'50px',borderRadius: '50%'}} src={`https://api.dicebear.com/5.x/initials/svg?seed=${username}`} alt="avatar" /> */}
            
        
            {/* <img style={{height:'50px',borderRadius: '50%'}} src={`https://api.dicebear.com/5.x/initials/svg?seed=${username}`} alt="avatar" /> */}
            </>
        
    );
    
  
}


export default Avatar;
