import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import React, { useState,useEffect } from "react";
import ModalWindow from "./ModalWindow";
import { GOneTapLogin } from '../components/Other/GLogin';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/DataReducer/action";
import { useLocation } from "react-router-dom";
// import CartData from "./CartData";


const Header = (props) => {
  const {change}=props;
  const [items, setItems] = useState([{}]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  sessionStorage.setItem('coupon', discount);
  const [cartData, setCartData] = useState();
  const products = useSelector((store) => store.dataReducer.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const userData=JSON.parse(localStorage.getItem('all'));

  const navigate = useNavigate();

  
  


  let num = useState({});

    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
  useEffect(() => {
    console.log('inside useState')
    // dispatch(getData());
    
    axios.get('http://localhost:4000/checkout', {params:
    userData
  }).then((response) => {
            const cur =[];
            const quant=[];
            let sum=0;
            // console.log(response);
            const all=response.data.cart.cart;
            localStorage.setItem('cart',JSON.stringify(all));
            
            all.forEach((number, index) => {
              cur.push(products.find((item) => item.productId === (number.id.split('/')[0])));
              quant.push(number.quantity);
              sum=sum+(number.quantity*Number(cur[index]?.selling_price));
              number.price=number.quantity*Number(cur[index]?.selling_price);
              
            //   console.log('Index: ' + index + ' Value: ' + number.id);
              setItems([...cur]);
              setQuantity([...quant]);
              setTotal(sum);
          });
        //   localStorage.setItem('cart',JSON.stringify(all));
        //   consol
          
          
          
          });
          
    
  }, [cartData,typeof items[0],change])
//   console.log(items,'yoyo',total);
  sessionStorage.setItem('items', JSON.stringify(items));
  sessionStorage.setItem('quantity', JSON.stringify(quantity));
  sessionStorage.setItem('total', total);

  console.log('here at header');


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




  // const navigate = useNavigate();
  const [login, setLogin] = useState();
  const [isToggle, setIsToggle] = useState(false);
  const [onetap, setOnetap] = React.useState({});


  const chooseonetap = (message) => {
    setOnetap(message);
    // if('user' in message && 'username' in message){
      // setLogin(true);
    // }
  };

  const toggleButton = () => {
    setIsToggle(!isToggle)
}

// const [items, setItems] = useState(getSessionStorageOrDefault('items', [{}]));
  // const [quantity, setQuantity] = useState(getSessionStorageOrDefault('quantity', []));
  // const [total, setTotal] = useState(getSessionStorageNumberOrDefault('total', 0));
  // const [cartData, setCartData] = useState();
  // const products = useSelector((store) => store.dataReducer.products);
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const userData=JSON.parse(localStorage.getItem('all'));
  // let num = useState({});

  //   useEffect(() => {
  //       if (products.length === 0) {
  //         dispatch(getData());
  //       }
  //     }, [dispatch, products.length,num]);
  // useEffect(() => {
  //   // dispatch(getData());
    
  //   axios.get('http://localhost:4000/checkout', {params:
  //   userData
  // }).then((response) => {
  //           const cur =[];
  //           const quant=[];
  //           let sum=0;
  //           const all=response.data.cart.cart;
  //           localStorage.setItem('cart',JSON.stringify(all));
            
  //           all.forEach((number, index) => {
  //             cur.push(products.find((item) => item.productId === (number.id.split('/')[0])));
  //             quant.push(number.quantity);
  //             sum=sum+(number.quantity*Number(cur[index]?.selling_price));
  //             number.price=number.quantity*Number(cur[index]?.selling_price);
  //             setItems([...cur]);
  //             setQuantity([...quant]);
  //             setTotal(sum);
  //         });
  //         localStorage.setItem('cart',JSON.stringify(all));
          
  //         });
          
    
  // }, [cartData,typeof items[0]])
  // // console.log(items,'yoyo',products);

  // sessionStorage.setItem('items', JSON.stringify(items));
  // sessionStorage.setItem('quantity', JSON.stringify(quantity));
  // sessionStorage.setItem('total', total);
  
  let token=localStorage.getItem('jwtToken');
  let cart=localStorage.getItem('cart');

  // useEffect(() => {
  //   console.log('useState');
  //   let items=JSON.parse(sessionStorage.getItem('items'));
  //   let quantity=JSON.parse(sessionStorage.getItem('quantity'));
  //   let total=Number(sessionStorage.getItem('total'));
  //   console.log(items);

  //   items && setItems(items);
  //   setQuantity(quantity);
  //   setTotal(total);
    
  // }, [total])

  // console.log(items)

  


  

  let authData=JSON.parse(sessionStorage.getItem('authData'));
  if(authData?.reload==='true'){
    window.location.reload();
    sessionStorage.setItem('authData', '{"reload":"false","modal":"open"}')
  }

  const handleDes = () => {
    console.log('click');
    navigate(`/`);
    window.location.reload();
    window.scrollTo(0,0); 
  };
  const handleViewCart = () => {
    if(token){
      navigate(`/viewcart`);
    }
    else{
      setIsToggle(true);
    }
    
    // window.location.reload();
    // window.scrollTo(0,0); 
  };
  if(products){

  return (
    <>
    {/* <CartData/> */}

    {(!token) && 
        <GOneTapLogin chooseonetap={chooseonetap}/>}
      <div className="header--sidebar" />
        <header className="header">
          <div className="header__top">
            <div className="container-fluid">
              <div className="row">

              </div>
            </div>
          </div>
          <nav className="navigation">
            <div className="container-fluid">
              <div className="navigation__column left" style={{width:'20%'}}>
                <div className="header__logo"><a className="ps-logo" style={{cursor:'pointer'}} onClick={() => handleDes()}><img src='images/footox_logo.jpeg' alt="" /></a></div>
              </div>
              <div className="navigation__column center">
                <ul className="main-menu menu">
                  <li className="menu-item menu-item-has-children dropdown"><a href="index.html">Home</a>
                    <ul className="sub-menu">
                      <li className="menu-item"><a href="index.html">Homepage #1</a></li>
                      <li className="menu-item"><a href="#">Homepage #2</a></li>
                      <li className="menu-item"><a href="#">Homepage #3</a></li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children has-mega-menu"><a href="#">Men</a>
                    <div className="mega-menu">
                      <div className="mega-wrap">
                        <div className="mega-column">
                          <ul className="mega-item mega-features">
                            <li><a href="product-listing.html">NEW RELEASES</a></li>
                            <li><a href="product-listing.html">FEATURES SHOES</a></li>
                            <li><a href="product-listing.html">BEST SELLERS</a></li>
                            <li><a href="product-listing.html">NOW TRENDING</a></li>
                            <li><a href="product-listing.html">SUMMER ESSENTIALS</a></li>
                            <li><a href="product-listing.html">MOTHER'S DAY COLLECTION</a></li>
                            <li><a href="product-listing.html">FAN GEAR</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">Shoes</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">All Shoes</a></li>
                            <li><a href="product-listing.html">Running</a></li>
                            <li><a href="product-listing.html">Training &amp; Gym</a></li>
                            <li><a href="product-listing.html">Basketball</a></li>
                            <li><a href="product-listing.html">Football</a></li>
                            <li><a href="product-listing.html">Soccer</a></li>
                            <li><a href="product-listing.html">Baseball</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">CLOTHING</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">Compression &amp; Nike Pro</a></li>
                            <li><a href="product-listing.html">Tops &amp; T-Shirts</a></li>
                            <li><a href="product-listing.html">Polos</a></li>
                            <li><a href="product-listing.html">Hoodies &amp; Sweatshirts</a></li>
                            <li><a href="product-listing.html">Jackets &amp; Vests</a></li>
                            <li><a href="product-listing.html">Pants &amp; Tights</a></li>
                            <li><a href="product-listing.html">Shorts</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">Accessories</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">Compression &amp; Nike Pro</a></li>
                            <li><a href="product-listing.html">Tops &amp; T-Shirts</a></li>
                            <li><a href="product-listing.html">Polos</a></li>
                            <li><a href="product-listing.html">Hoodies &amp; Sweatshirts</a></li>
                            <li><a href="product-listing.html">Jackets &amp; Vests</a></li>
                            <li><a href="product-listing.html">Pants &amp; Tights</a></li>
                            <li><a href="product-listing.html">Shorts</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">BRAND</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">NIKE</a></li>
                            <li><a href="product-listing.html">Adidas</a></li>
                            <li><a href="product-listing.html">Dior</a></li>
                            <li><a href="product-listing.html">B&amp;G</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item"><a href="#">Women</a></li>
                  <li className="menu-item"><a href="#">Kids</a></li>
                  <li className="menu-item menu-item-has-children dropdown"><a href="#">News</a>
                    <ul className="sub-menu">
                      <li className="menu-item menu-item-has-children dropdown"><a href="blog-grid.html">Blog-grid</a>
                        <ul className="sub-menu">
                          <li className="menu-item"><a href="blog-grid.html">Blog Grid 1</a></li>
                          <li className="menu-item"><a href="blog-grid-2.html">Blog Grid 2</a></li>
                        </ul>
                      </li>
                      <li className="menu-item"><a href="blog-list.html">Blog List</a></li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children dropdown"><a href="#">Contact</a>
                    <ul className="sub-menu">
                      <li className="menu-item"><a href="contact-us.html">Contact Us #1</a></li>
                      <li className="menu-item"><a href="contact-us.html">Contact Us #2</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="navigation__column right" style={{maxWidth:'350px'}}>
              
                <form className="ps-search--header" action="do_action" method="post">
                  <input className="form-control" type="text" placeholder="Search Product…" />
                  <button><i className="ps-icon-search" /></button>
                </form>
                
                <div className="ps-cart" ><a className="ps-cart__toggle" href="#"><span><i>{items.length}</i></span><i className="ps-icon-shopping-cart" /></a>
                  <div className="ps-cart__listing" style={{width:'350px'}}>
                    <div className="ps-cart__content" >
                    {items.length!==0 && items.map((item,index)=>{
                      return(
                        <div className="ps-cart-item"><a className="ps-cart-item__close" href="#" />
                        <div className="ps-cart-item__thumbnail"><a href="product-detail.html" /><img src={item?.image?.length>1 ?  item?.image[0] : "images/product/cart-preview/1.jpg"} alt="" /></div>
                        <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">{items?.productName}</a>
                          <p style={{float:'left',position:'relative'}}><span>Quantity:<i>{(quantity)[index]}</i></span><span>Total:<i>₹{item?.selling_price*quantity[index]}</i></span></p>
                        </div>
                      </div>

                      );
                    })}
                      
                    </div>
                    <div className="ps-cart__total">
                      <p>Number of items:<span>{items.length}</span></p>
                      <p>Item Total:<span>₹{total}</span></p>
                    </div>
                    <div className="ps-cart__footer"><a className="ps-btn" onClick={handleViewCart} style={{cursor:'pointer'}}>Check out<i className="ps-icon-arrow-left" /></a></div>
                  </div>
                </div>
               
                
                
                
              </div>
              
                
                
                  
                  <ModalWindow toggled={isToggle} toggle={toggleButton} />

                
                  {/* <img onClick={() => setIsOpen(true)} src='images/user.png' style={{height:'40px'}}></img> */}
                  
                {/* </div> */}
                
            </div>
          </nav>
        </header>
        <div className="header-services">
          <div className="ps-services owl-slider">
            <OwlCarousel items={1} margin={0} autoplay={true} loop={true} dots={false} nav={false}>

              <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
              <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
              <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
            </OwlCarousel>
          </div>
        </div> 
     

    </>
  )
}
}


export default Header;