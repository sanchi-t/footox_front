import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import React, { useState } from "react";
import ModalWindow from "./ModalWindow";
import { GOneTapLogin } from '../components/Other/GLogin';

const Header = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState();
  const ifLogin = (type) => {
    setLogin(type);
  };
  const [onetap, setOnetap] = React.useState({});

  const chooseonetap = (message) => {
    setOnetap(message);
    // if('user' in message && 'username' in message){
      console.log(message);
      // setLogin(true);
    // }
  };

  console.log('sanchit onetap',onetap);
  let token=localStorage.getItem('jwtToken');

  const handleDes = () => {
    console.log('click');
    navigate(`/`);
    window.location.reload();
    window.scrollTo(0,0); 
  };

  return (
    <>
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
                <div className="header__logo"><a className="ps-logo" onClick={() => handleDes()}><img src='images/footox_logo.jpeg' alt="" /></a></div>
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
                
                <div className="ps-cart" ><a className="ps-cart__toggle" href="#"><span><i>20</i></span><i className="ps-icon-shopping-cart" /></a>
                  <div className="ps-cart__listing">
                    <div className="ps-cart__content">
                      <div className="ps-cart-item"><a className="ps-cart-item__close" href="#" />
                        <div className="ps-cart-item__thumbnail"><a href="product-detail.html" /><img src='images/cart-preview/1.jpg' alt="" /></div>
                        <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">Amazin’ Glazin’</a>
                          <p><span>Quantity:<i>12</i></span><span>Total:<i>£176</i></span></p>
                        </div>
                      </div>
                      <div className="ps-cart-item"><a className="ps-cart-item__close" href="#" />
                        <div className="ps-cart-item__thumbnail"><a href="product-detail.html" /><img src='images/cart-preview/2.jpg' alt="" /></div>
                        <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">The Crusty Croissant</a>
                          <p><span>Quantity:<i>12</i></span><span>Total:<i>£176</i></span></p>
                        </div>
                      </div>
                      <div className="ps-cart-item"><a className="ps-cart-item__close" href="#" />
                        <div className="ps-cart-item__thumbnail"><a href="product-detail.html" /><img src='images/cart-preview/3.jpg' alt="" /></div>
                        <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">The Rolling Pin</a>
                          <p><span>Quantity:<i>12</i></span><span>Total:<i>£176</i></span></p>
                        </div>
                      </div>
                    </div>
                    <div className="ps-cart__total">
                      <p>Number of items:<span>36</span></p>
                      <p>Item Total:<span>£528.00</span></p>
                    </div>
                    <div className="ps-cart__footer"><a className="ps-btn" href="cart.html">Check out<i className="ps-icon-arrow-left" /></a></div>
                  </div>
                </div>
               
                
                
                
              </div>
              
                
                
                  
                  <ModalWindow ifLogin={ifLogin} />

                
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


export default Header;