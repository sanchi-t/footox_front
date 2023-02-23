import {
    Box,
    Heading,
    // Image,
    SimpleGrid,
    Text,
    useMediaQuery,
    Flex,
    border,
    space,
  
  } from "@chakra-ui/react";
  import React from "react";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate, Link, useLocation } from "react-router-dom";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  // import Sidebar1 from "./Sidebar1";
  // import { data } from "jquery";
  // import Loader from '../Layouts/Loader';
  // import MinCategory from '../Layouts/MinCategory';
  // import MetaData from '../Layouts/MetaData';
  
      
  const ProfilePage = () =>{
    const [prod, setProd] = useState([]);
    const [userData,setUserData]=useState({});
    const location = useLocation();
    const email = location.state.email;
  
    // const axiosTest = async () =>{
    //   await axios.get("http://localhost:4000/userDetails",{params:
    //   JSON.parse(localStorage.get('all'))
    // }).then((data)=>{
    //        setProd(data.data);
    //        console.log(data.data)
    //   }
    //   );
     
    // }
  
    useEffect(()=>{
      if(localStorage.getItem('jwtToken')){
          setUserData(JSON.parse(localStorage.getItem('all')));
      }
      
    }, []);
  
  
    console.log('prod', prod);
    const prod1 = prod.filter((items) =>items.email === email);
  
    // console.log(prod1,'aman',userData);
  
  
  
    return(
      <>
      <Header/>
      
      {/* <Sidebar1/> */}
              {/* <MetaData title="My Profile" /> */}
  
              {/* {loading ? <Loader /> :
                  <> */}
                      {/* <MinCategory /> */}
                      <div className="row">
                     <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div className="ps-checkout__billing" style={{paddingLeft:'5%'}}>
                        <h1>My Profile</h1>
                        <br>
                        </br>
                        <br>
                        </br>
                        
                              <div className="form-group form-group--inline  ">
                                <label style={{fontSize:'22px',fontWeight:'bold',}}>Name<span>*</span>
                                </label>
                                <input className="form-control" type="text" style={{width:'350px',fontSize:'20px'}} defaultValue={userData.username} name="name" />
                              </div>
                              <div className="form-group form-group--inline ">
                                <label style={{fontSize:'22px',fontWeight:'bold',}}>Email Address<span>*</span>
                                </label>
                                <input className="form-control" type="email" style={{width:'350px',fontSize:'20px'}} defaultValue={userData.email} name="email" />
                              </div>
                              
                              <div className="form-group form-group--inline ">
                                <label style={{fontSize:'22px',fontWeight:'bold',}}>Phone<span>*</span>
                                </label>
                                <input className="form-control" type="text" style={{width:'350px',fontSize:'20px'}} defaultValue={userData?.mobile} name="mobile" />
                              </div>
                               {/* <div className="form-group form-group--inline ">
                                <label style={{fontSize:'22px',fontWeight:'bold',}}>Username<span>*</span>
                                </label>
                                <input className="form-control" type="text" style={{width:'350px',fontSize:'20px'}} defaultValue={prod1[0]?.use} name="username" />
                              </div> */}
                              <div className="form-group form-group--inline ">
                                <label style={{fontSize:'22px',fontWeight:'bold',}}>Address<span>*</span>
                                </label>
                                <input className="form-control" type="text" style={{width:'350px',fontSize:'20px'}} name="address" />
                              </div>
                              <br>
                              </br>
                              {/* </div> */}
                        <div className="form-group" >
                          <div className="ps-checkbox" style={{width:"50px",display:'inline'}}>
                            {/* <input className="form-control" onChange={handleChange} type="checkbox" id="cb01" /> */}
                            <label for="cb01" name="saveAddress" >Save this address?</label>
                            
                          </div>
                          <br>
                          </br>
                          <br>
                          </br>
                           <div className="flex flex-col gap-4 mt-4">
                                          <span className="font-medium text-lg mb-2" style={{fontSize:'25px',fontWeight:"normal"}}>FAQS</span>
                                          <h4 className="text-sm font-medium">What happens when I update my email address (or mobile number)?</h4>
                                          <p className="text-sm">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
  
                                          <h4 className="text-sm font-medium">When will my Footox account be updated with the new email address (or mobile number)?</h4>
                                          <p className="text-sm">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
  
                                          <h4 className="text-sm font-medium">What happens to my existing Footox account when I update my email address (or mobile number)?</h4>
                                          <p className="text-sm">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
  
                                          <h4 className="text-sm font-medium">Does my Seller account get affected when I update my email address?</h4>
                                          <p className="text-sm">Footox has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
  
                                      </div>
                            
                            {/* <label style={{paddingLeft:'50px',cursor:'pointer',color:'#737373'}} onClick={handleShow} ><a>Use other address?</a></label> */}
  
                        </div>
                        {/* <h3 className="mt-40"> Addition information</h3>
                        <div className="form-group form-group--inline textarea">
                          <label>Order Notes</label>
                          <textarea className="form-control" rows="5" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                        </div> */}
                      </div>
                    </div>
                    </div>
                          <Footer/>
  
                  </>
          //     }
          // </>
      );
  };
  
  export default ProfilePage;