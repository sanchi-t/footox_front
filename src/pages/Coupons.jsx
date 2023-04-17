import Header from "../components/Header"
import Footer from "../components/Footer"
import React from 'react';
import axios from "axios";
import styles from './Coupons.module.css';
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Flex,
  Badge,
  Kbd,
  Stack,
} from "@chakra-ui/react";
const BackendServer = process.env.REACT_APP_API_BASE_URL;

const Coupon =()=>{
    // console.log("Hi")
    const [coupon, setCoupon] = useState([]);

     useEffect(()=>{
        axios.get(`${BackendServer}coupon`, {}).then((response) => {
      // setCartData(response);
      console.log(response.data)
    //   setCoupon(response.data)
      checkcoupon(response.data)
     
    });

   
    
  }, []);
const checkcoupon=(coup)=>{
    let verfied=[]
    coup.forEach(function(value) {
    if(value.status==="Active" && value.promote===true ){
        verfied.push(value)
    }

});

setCoupon(verfied)
    
}
  console.log(coupon)
    return(
        
       <React.Fragment>
      {/* <body className="ps-loading"> */}
        <Header/>
        <br>
        </br>
        <br>
        </br>
        {/* <main className="ps-main"> */}
            {/* <h1>Hi</h1> */}
            {coupon.map((item, index) => {
                return(
                  <div className={`${styles.coupon}`}>
                  <div className={`${styles.container}`} >
                    {/* <h2>{item.title}</h2> */}
                    </div>
                    <div className={`${styles.container}`} style={{backgroundColor:'white'}}>
                      <p className={`${styles.description}`} >{item.title}</p>
                      </div>
                      <div className={`${styles.container}`}>
                        <p classname={`${styles.avail1}`} style={{fontSize:'20px',color:'black'}}>Use Promo Code:<span className={`${styles.promo}`}>{item.code}</span></p>
                        <p classname={`${styles.avail1}`} style={{fontSize:'20px',color:'red'}}>End Date: {item.endDate}</p>
                        
                      
              {/* //        <Flex justifyContent={"space-around"} alignItem={"center"}>
              //   <Badge colorScheme="green" textTransform={"lowercase"}>
              //     {item.code}{item.title}
              //   </Badge>{" "}
              //   <Kbd>20% off</Kbd>
              // </Flex> */}
              </div>
              </div>
                    
                    
                )


            })}
        
          {/* <SlideShow parentToChild={prod} /> */}
          
          
          {/* <div style={{padding:'130px'}}></div>
          <div style={{padding:`${((Math.ceil(products.length/4))-1)*260}px`}}></div> */}
       
         
        
         <br>
         </br>
         <br>
         </br>
   
          <Footer />
        {/* </main> */}
      {/* </body> */}
      
    </React.Fragment>
    )
}

export default Coupon;