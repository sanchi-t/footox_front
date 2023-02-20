
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from './OrderConfirmed.module.css';
import { useState } from "react";




const OrderCorfirmed =()=>{




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





    const navigate = useNavigate();

    const [order,setOrder]=useState(getSessionStorageOrDefault('order', {}));
    const [allitems,setItems]=useState(getSessionStorageOrDefault('items', []));
    const [total,setTotal]=useState(getSessionStorageNumberOrDefault('total', 0));

  
    useEffect(() => {
        console.log('i fire once');
        let order1=JSON.parse(sessionStorage.getItem('order'));
        let items1=JSON.parse(sessionStorage.getItem('items'));
        let items2=Number(sessionStorage.getItem('total'));
        // setOrder(order1);
        // setItems(items1);
        // setTotal(items2)
        
      }, [total]);
  
      console.log(order);

  const handleDes = () => {
    console.log('click');
    navigate(`/`);
    window.location.reload();
  };
  const handleClick = () => {
    axios.post('http://localhost:4000/orderConfirmed', {order:JSON.parse(sessionStorage.getItem('order'))})
          .then((response) => {
            console.log(response);
          });
        
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;


    return(
        <body className="ps-loading">

            <Header/>
        {/* <div className="ps-404 bg--cover" data-background="images/confirm.jpg" style={{height:'350px'}}>
          <div className="ps-404__content">
            <h3 style={{color:'black'}}>Order Confirmed</h3>
            <p>Your Order has been placed check myorder under profile section to know more about it.</p><a className="ps-btn" onClick={handleDes}>Back to home<i className="ps-icon-next"></i></a>
          </div>
        </div> */}
        <main className="ps-main" style={{paddingTop:'50px',paddingBottom:'50px'}}>
        <div className={styles.card}>
          <div className="ps-4041 bg--cover" data-background="images/confirm.jpg" style={{height:'340px'}}>
          <div className="ps-404__content"  style={{color:'black',maxWidth: '700px',position: 'absolute',top: '18%',left: '50%',textAlign: 'center',WebkitTransform:' translate(-50%, -50%)',MozTransform: 'translate(-50%, -50%)',MsTransform: 'translate(-50%, -50%)',OTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'}}>
            <h3 style={{color:'black',marginBottom: '25px',fontFamily: "Montserrat, sans-serif",fontSize: '36px',fontWeight: '600',letterSpacing: '2px',textTransform: 'uppercase'}}>Order Confirmed</h3>
            <p>Your Order has been placed check myorder under profile section to know more about it.</p>
          </div>

        </div>
        <hr style={{backgroundColor:'rgb(252, 103, 49)',height:'2px'}}></hr>
            <div className={styles.title}>Purchase Reciept</div>
            <div className={styles.info}>
                <div className={`${styles.row}`}>
                    <div className={`${styles.col-7}`}>
                        <span id={`${styles.heading}`}>Date</span><br/>
                        <span id={`${styles.details}`}>{today}</span>
                    </div>
                    <div className={`${styles.col-5} ${styles.pullright}`}>
                        <span id={`${styles.heading}`}>Order No.</span><br/>
                        <span id={`${styles.details}`}>012j1gvs356c</span>
                    </div>
                </div>      
            </div>      
            
                
                    {allitems.map((item,index)=>{
                      return(<>
                      <div className={`${styles.pricing}`}>
                      <div className={`${styles.row}`}>                        <div className={`${styles.col-9}`}>
                        <span id={`${styles.name}`}>{item?.productName}</span>  
                    </div>
                    <div className={`${styles.col-3}`}>
                        <span id={`${styles.price}`}>₹{item?.selling_price}</span>
                    </div>                </div>
                    <div className={`${styles.row}`}>
                    <div className={`${styles.col-9}`}>
                        <span id={`${styles.name}`}>Shipping</span>
                    </div>
                    <div className={`${styles.col-3}`}>
                        <span id={`${styles.price}`}>₹33.00</span>
                    </div></div></div>
                      <div style={{height:'15px',backgroundColor:'white'}}></div></>
                      )
                    })}
                
                
            
            <div className={`${styles.total}`}>
                <div className={`${styles.row}`}>
                    <div className={`col-9`}></div>
                    <div className={`col-3`}><big>₹{total}</big></div>
                </div>
            </div>
            <div className={`${styles.tracking}`}>
                <div className={`${styles.title}`}>Tracking Order</div>
            </div>
            <div className={`${styles.progresstrack}`}>
            {/* <ul id="progressbar" >
                    <li class="step0 active " id="step1">PLACED</li>
                    <li class="step0 active text-center" id="step2">SHIPPED</li>
                    <li class="step0  text-muted text-right" id="step3">DELIVERED</li>
            </ul> */}
                 <ul id={`${styles.progressbar}`}>
                    <li className={`${styles.step0} ${styles.active}`} id={`${styles.step1}`}>Ordered</li>
                    <li className={`${styles.step0} text-center`} id={`${styles.step2}`}>Shipped</li>
                    <li className={`${styles.step0} text-center`} id={`${styles.step3}`}>On the way</li>
                    <li className={`${styles.step0} text-right`} id={`${styles.step4}`} >Delivered</li>
                </ul> 
            </div>
            

            <div className={styles.footer}>
                <div className={styles.row}>
                    <div className={styles.col-2}><img className={styles.imgfluid} src="https://i.imgur.com/YBWc55P.png"/></div>
                    <div className={styles.col-10}>Want any help? Please &nbsp;<a> contact us</a></div>
                </div>
                
               
            </div>
        </div>
        </main>
        <Footer/>
      </body>
    )
}


export default OrderCorfirmed;