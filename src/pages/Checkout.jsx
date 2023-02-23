import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/DataReducer/action";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from 'react-bootstrap/Modal';
import '../components/Modal.css';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { getLocalData } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";


const BackendServer = process.env.REACT_APP_BACKEND_SERVER;


const Checkout=()=>{

  function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

  function getSessionStorageNumberOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return Number(stored);
  }
    const [prod, setProd] = useState();
    const [show, setShow] = useState(false);
    const [coupon, setCoupon]=useState(getSessionStorageNumberOrDefault('coupon', 0));
    const [currentAddress, setCurrentAddress]=useState('');
    const [checked, setChecked]=useState();
    const [Quantity, setQuantity]=useState(getSessionStorageOrDefault('quantity', []));
    const [total, setTotal]=useState(getSessionStorageNumberOrDefault('total', 0));
    const [stock, setStock] = useState([]);
    const userData=JSON.parse(localStorage.getItem('all'));
    

    const products = useSelector((store) => store.dataReducer.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [currentProducts, setCurrentProducts] = useState([]);
    const [items, setItems] = useState(getSessionStorageOrDefault('items', [[]]));
    const [address, setAddress] = useState([]);
    // console.log(items);

    useEffect(() => {
      console.log('inside use effect');
      
      // const address = JSON.parse(localStorage.getItem('all')).address;
      // console.log('useeffect',items,quantity)
      // setItems(items);
      // setQuantity(quantity);
      // setTotal(total);
      // setCoupon(coup);

      axios.get(`${BackendServer}address`, {params:userData})
          .then((response) => {
            setAddress(response.data.address.address);
            console.log(response.data.address,'response');
          });
      
    }, [items.length,typeof items[0]]);

    let num = useState({});
    
    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
      // useEffect(() => {
        // if (items) {
        //   const cur =[];
        //   const quant=[];
        //   let sum=0;
        //   items.forEach((number, index) => {
        //     cur.push(products.find((item) => item.productId === (number[0])));
        //     quant.push(number[1]);
        //     sum=sum+(number[1]*Number(cur[index]?.selling_price));
        //     // console.log(sum,'sum',Number(cur[index]?.selling_price))
        //     console.log('Index: ' + index + ' Value: ' + number);
        // });
        // const coup=sessionStorage.getItem("coupon");
        // if(coup){
        //   sum=sum-Number(coup);
        // }  
        // cur && setCurrentProducts(cur);
        // quant && setQuantity(quant);
        // sum && setTotal(sum);
        // coup && setCoupon(coup);
        // console.log(coupon,'hiiii coupon',coup);
        // cur && setColor(cur.color)
        // cur && setImg(cur.image);
        // cur && setSize(cur.Sizes);
          
          // setProd(products)
      //   }
      // }, [products]);

      // console.log('checkout page',items,Quantity)


      const handleSubmit =async (event) => {
        const form={address:{}};
        event.preventDefault();
        // event.target.address.reset();
        const userData=JSON.parse(localStorage.getItem('all'));
        form.name_reciever=event.target.name.value;
        // form.lastname=event.target.lastName.value;
        form.email_reciever=event.target.email.value;
        form.mobile_reciever=event.target.mobile.value;
        form.name_user=userData.username;
        form.email_user=userData.email;
        form.mobile_user=userData.mobile;
        form.address={place:event.target.address.value,save:checked};
        // form.address.save=checked;
        
        form.items=JSON.parse(localStorage.getItem('cart'));
        // form.items.forEach((val,index)=>{
        //   val.price=Number(JSON.parse(sessionStorage.getItem('items'))[index].selling_price);
        // })
        form.total=sessionStorage.getItem('total');
        form.coupon={value:sessionStorage.getItem('coupon'),code:sessionStorage.getItem('code')};
        sessionStorage.setItem('order',JSON.stringify(form));
        
        const uuid=sessionStorage.getItem('uuid');
        const response = axios.get(`${BackendServer}getStock`).then((response) => {
          // console.log(response.data);
          setStock(response.data);
          console.log(stock);
        });
        // console.log(response);
    
        await axios.post(`${BackendServer}changeStock`, { items: form.items }).then((res) => {
          console.log(res.data, "aaa");
          // alert(res.data);
    
          if (res.data != "Not Available") {
            axios.post(`${BackendServer}orderPlaced`, { form }).then(async (response) => {
              console.log(response);
              sessionStorage.setItem("order", JSON.stringify(response.data.order));
    
              console.log(form.coupon);
              if (form.coupon.value != 0) {
                axios
                  .post(`${BackendServer}couponApplied`, {
                    email: localStorage.getItem("userInfo"),
                    uuid: uuid,
                    coupon: form.coupon,
                  })
                  .then((response) => {
                    console.log(response);
                  });
              }
            });
             navigate(`/confirmed`);
             window.location.reload();
          } else {
            alert("Order is out of stock");
          }
        });
        if (checked) {
          axios
            .post(`${BackendServer}address`, { address: form.address, email: localStorage.getItem("userInfo") })
            .then((response) => {
              console.log(response);
            });
        } else {
          console.log(checked);
        }
        
        
      }

      const handleChange=(event)=>setChecked(event.target.checked);
      const handleClose = () => {
        setShow(false);
        setCurrentAddress('');

      };
      const handleShow = () => setShow(true);

      const handleModal=(event)=>{
        setCurrentAddress(event.target.value);

        console.log(event.target.value,'modal');
      }
      
      const handleSaveChanges=(event)=>{
        setShow(false);
        // handleSubmit();
      }

      const handleAddress=(event)=>{
        setCurrentAddress(event.target.value);
        console.log('hi');
        // handleSubmit();
      }

      // console.log(products,'cur2');
      console.log(currentProducts, 'cur');
      let index = products.indexOf(currentProducts);
      if(products){

    return (

       <body className="ps-loading">
          <Header/>
          <div className="ps-checkout pt-80 pb-80">
        <div className="ps-container">
          <form className="ps-checkout__form" onSubmit={handleSubmit} >
            <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                    <div className="ps-checkout__billing">
                      <h3>Billing Detail</h3>
                            <div className="form-group form-group--inline">
                              <label>Name<span>*</span>
                              </label>
                              <input className="form-control" type="text" defaultValue={JSON.parse(sessionStorage.getItem('order'))?.name_reciever || ''} name="name" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Email Address<span>*</span>
                              </label>
                              <input className="form-control" type="email" defaultValue={JSON.parse(sessionStorage.getItem('order'))?.email_reciever || ''} name="email" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Phone<span>*</span>
                              </label>
                              <input className="form-control" type="text" defaultValue={JSON.parse(sessionStorage.getItem('order'))?.mobile_reciever || ''} name="mobile" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Address<span>*</span>
                              </label>
                              <input className="form-control" type="text" name="address" onChange={handleAddress} value={JSON.parse(sessionStorage.getItem('order'))?.address.place || currentAddress}/>
                            </div>
                      <div className="form-group" >
                        <div className="ps-checkbox" style={{width:"200px",display:'inline'}}>
                          <input className="form-control" onChange={handleChange} type="checkbox" id="cb01" />
                          <label for="cb01" name="saveAddress" >Save this address?</label>
                          
                        </div>
                          
                          <label style={{paddingLeft:'50px',cursor:'pointer',color:'#737373'}} onClick={handleShow} ><a>Use other address?</a></label>

                      </div>
                      <h3 className="mt-40"> Addition information</h3>
                      <div className="form-group form-group--inline textarea">
                        <label>Order Notes</label>
                        <textarea className="form-control" rows="5" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-checkout__order">
                      <header>
                        <h3>Your Order</h3>
                      </header>
                      <div className="content">
                        <table className="table ps-checkout__products">
                          <thead>
                            <tr>
                              <th className="text-uppercase">Product</th>
                              <th className="text-uppercase">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item,index)=>{
                              return(
                                <tr>
                                  <td>{item?.productName}  <div style={{fontWeight:'bold',fontSize:'1.7rem',display:'inline',color:'beige'}}>&nbsp;x{Quantity[index]}</div></td>
                                  <td>₹{Quantity[index]*Number(item?.selling_price)}</td>
                                  
                                </tr>
                              )
                            })}
                            {(coupon!==0)?<tr><td style={{color:'green'}}>Discount</td><td style={{color:'green'}}>-₹{coupon}</td></tr>:<></>
                            }
                            
                            {/* <tr>
                              <td>Card Subtitle</td>
                              <td>$300.00</td>
                            </tr> */}
                            <tr>
                              <td style={{fontWeight:'bold',fontSize:"1.9rem"}}>Order Total</td>
                              <td style={{fontWeight:'bold',fontSize:"1.9rem"}}>₹{total-coupon}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <footer>
                        <h3>Payment Method</h3>
                        <div className="form-group paypal">
                          <div className="ps-radio">
                            <input className="form-control" type="radio" id="rdo01" name="cash" checked />
                            <label for="rdo01">Cash On Delivery</label>
                            <p>Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                          </div>
                        </div>
                        <div className="form-group cheque">
                          <div className="ps-radio">
                            <input className="form-control" type="radio" id="rdo01" name="payment" checked />
                            <label for="rdo01">Cheque Payment</label>
                            <p>Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                          </div>
                        </div>
                        <div className="form-group paypal">
                          <div className="ps-radio ps-radio--inline">
                            <input className="form-control" type="radio" name="payment" id="rdo02" />
                            <label for="rdo02">Paypal</label>
                          </div>
                          <ul className="ps-payment-method">
                            <li><a href="#"><img src="images/payment/1.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/payment/2.png" alt="" /></a></li>
                            <li><a href="#"><img src="images/payment/3.png" alt="" /></a></li>
                          </ul>
                          <button className="ps-btn ps-btn--fullwidth">Place Order<i className="ps-icon-next"></i></button>
                        </div>
                      </footer>
                    </div>
                    <div className="ps-shipping">
                      <h3>FREE SHIPPING</h3>
                      <p>YOUR ORDER QUALIFIES FOR FREE SHIPPING.<br></br> <a href="#"> Singup </a> for free shipping on every order, every time.</p>
                    </div>
                  </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
      <div style={{verticalAlign:'middle',float:'right',display:'flex',justifyContent:'flex-end',paddingTop:'28px'}}>
      
        <Modal
          show={show}
          // size={'lg'}
          dialogClassName="modal-width"
          style={{opacity:1,top:'30px',width:'785px',left:'25%'}}
          onHide={handleClose}
          keyboard={true}
        >
        
          <Modal.Body>
            {address.map((item,index)=>{
              return(
                <div className="radio" style={{backgroundColor:'#E4E4E4'}} onChange={handleModal}>
                <label>
                  <input
                    name="radioButton"
                    type="radio"
                    id={index+1}
                    value={item}
                    
                  />
                  {item}
                </label>
              </div>
            )})}

         
        

          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
          
          
        </Modal></div>
          </body>
     
        
      );
}
}


export default Checkout;