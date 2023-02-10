import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Login from '../pages/Login';
import './Modal.css'
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';


const ModalWindow=()=>{
  const [show, setShow] = useState(false);
  const [message, setMessage] = React.useState({});
  // const [token, setToken] = React.useState();
  // console.log('again');
  
  
  const chooseMessage = (message) => {
    setMessage(message);
    if('user' in message && 'username' in message){
      console.log(message);
      // setLogin(true);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log('abvatar',message);
  let token=localStorage.getItem('jwtToken');
  
  
  
  // console.log('cookir',username);
  

  

  return (
    <>
    {(token) &&
    <div style={{verticalAlign:'middle',float:'right',display:'flex',justifyContent:'flex-end',paddingTop:'18px'}}>
      <Avatar />
      </div>

    }
      
      {(!token) && 
        <div style={{verticalAlign:'middle',float:'right',display:'flex',justifyContent:'flex-end',paddingTop:'28px'}}>
      <Button variant="primary" onClick={handleShow}>
                Login
      </Button>
      
      <Modal
        show={show}
        // size={'lg'}
        dialogClassName="modal-width"
        style={{opacity:1}}
        

        onHide={handleClose}
        
        keyboard={true}
      >
      
        <Modal.Body>
          <Login chooseMessage={chooseMessage}/>
        </Modal.Body>
        
      </Modal></div>
      }
    </>
  );
}

export default ModalWindow;