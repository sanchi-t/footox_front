import React, { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";



const Avatar=()=> {
    const profileText=localStorage.getItem('user');
    let profile; 
  
    if(profileText!==null){
      console.log(profileText,'ji');
      profile=JSON.parse(profileText);
    }

    console.log(profile?.picture)
    let username = localStorage.getItem('username');
    console.log('username');
    const logoutHandler = () => {
        console.log('deleted here');
        localStorage.removeItem('username');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        window.location.reload();
        }
    // console.log(chooseMessage);

    return(<>
        <Menu>
            <MenuButton
              as={Button}
              style={{backgroundColor: '#FFFFFF',border: 'none',margin:'0px',paddingRight:'0px',paddingLeft:'5px'}}
              rightIcon={<AiFillCaretDown  style={{width:'70%', color: 'black',float:'left'}} />}>
                {(profile?.picture) &&
                  <img style={{height:'50px',borderRadius: '50%'}} src={profile.picture} alt="avatar" />
                }
                {(!profile) &&

                  <img style={{height:'50px',borderRadius: '50%'}} src={`https://api.dicebear.com/5.x/initials/svg?seed=${username}`} alt="avatar" />
                }
            </MenuButton>
            <MenuList>
              <MenuItem as={"Button"} style={{color:'black'}} onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
        </Menu>
            {/* <img style={{height:'50px',borderRadius: '50%'}} src={`https://api.dicebear.com/5.x/initials/svg?seed=${username}`} alt="avatar" /> */}
            </>
        
    );
    
  
}


export default Avatar;
