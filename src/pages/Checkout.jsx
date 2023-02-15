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




const Checkout=()=>{
    
    const [prod, setProd] = useState();
    const [show, setShow] = useState(false);
    const [coupon, setCoupon]=useState();
    const [currentAddress, setCurrentAddress]=useState('');
    const [checked, setChecked]=useState();
    const [Quantity, setQuantity]=useState([]);
    const [total, setTotal]=useState();
    const userData=JSON.parse(localStorage.getItem('all'));

    const products = useSelector((store) => store.dataReducer.products);
    const dispatch = useDispatch();
    

    const [currentProducts, setCurrentProducts] = useState([]);
    const [items, setItems] = useState([[]]);
    const [address, setAddress] = useState([]);
    // console.log(items);

    useEffect(() => {
      const items = JSON.parse(sessionStorage.getItem('items'));
      const quantity = JSON.parse(sessionStorage.getItem('quantity'));
      const total = Number(sessionStorage.getItem('total'));
      const coup=Number(sessionStorage.getItem("coupon"));
      // const address = JSON.parse(localStorage.getItem('all')).address;
      console.log('useeffect',items,quantity)
      setItems(items);
      setQuantity(quantity);
      setTotal(total);
      setCoupon(coup);

      axios.get('http://localhost:4000/address', {params:userData})
          .then((response) => {
            setAddress(response.data.address.address);
            console.log(response.data.address,'response');
          });
      
    }, []);

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


      const handleSubmit = (event) => {
        const form={address:{}};
        event.preventDefault();
        event.target.address.reset();
        form.firstname=event.target.firstName.value;
        form.lastname=event.target.lastName.value;
        form.email=event.target.email.value;
        form.mobile=event.target.mobile.value;
        form.address.place=event.target.address.value;
        form.address.save=checked;
        axios.post('http://localhost:4000/address', {form})
          .then((response) => {
            console.log(response);
          });
        if(checked){
          console.log('address',event.target.address.value);
          
        }
        else{
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
                              <label>First Name<span>*</span>
                              </label>
                              <input className="form-control" type="text" name="firstName" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Last Name<span>*</span>
                              </label>
                              <input className="form-control" type="text" name="lastName" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Company Name<span>*</span>
                              </label>
                              <input className="form-control" type="text" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Email Address<span>*</span>
                              </label>
                              <input className="form-control" type="email" name="email" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Company Name<span>*</span>
                              </label>
                              <input className="form-control" type="text" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Phone<span>*</span>
                              </label>
                              <input className="form-control" type="text" name="mobile" />
                            </div>
                            <div className="form-group form-group--inline">
                              <label>Address<span>*</span>
                              </label>
                              <input className="form-control" type="text" name="address" onChange={handleAddress} value={currentAddress}/>
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