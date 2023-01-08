import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData, getBannerData } from "../redux/DataReducer/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';

import axios from "axios";



const Homepage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const products1 = useSelector((store) => store.dataReducer.products);

  const products = useSelector((store) => store.dataReducer.products);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/${id}`);
  };
  const sortBy = searchParams.get("sortBy");

  const queryParams = {
    params: {
      category: searchParams.getAll("category"),
      gender: searchParams.getAll("gender"),
      colortype: searchParams.getAll("colortype"),
      sizes: searchParams.getAll("sizes"),
      _sort: sortBy && "rating",
      _order: sortBy,
    },
  };
  const [prod, setProd] = useState();

  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get('http://localhost:4000/banner')
      setProd(response.data)
    }
    const l = axiosTest()
  }, [])
  console.log('kuhoo', prod)
  useEffect(() => {
    dispatch(getData(queryParams));
  }, [])
  console.log('helloo', products, products1)

  return (
    <React.Fragment>
      <body className="ps-loading">

        <div className="header--sidebar" />
        <header className="header">
          <div className="header__top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                  <p>460 West 34th Street, 15th floor, New York  -  Hotline: 804-377-3580 - 804-399-3580</p>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12">
                  <div className="header__actions"><a href="#">Login &amp; Regiser</a>
                    <div className="btn-group ps-dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">USD<i className="fa fa-angle-down" /></a>
                      <ul className="dropdown-menu">
                        <li><a href="#"><img src='images/flag/usa.svg' alt="" /> USD</a></li>
                        <li><a href="#"><img src='images/flag/singapore.svg' alt="" /> SGD</a></li>
                        <li><a href="#"><img src='images/flag/japan.svg' alt="" /> JPN</a></li>
                      </ul>
                    </div>
                    <div className="btn-group ps-dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Language<i className="fa fa-angle-down" /></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">English</a></li>
                        <li><a href="#">Japanese</a></li>
                        <li><a href="#">Chinese</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="navigation">
            <div className="container-fluid">
              <div className="navigation__column left">
                <div className="header__logo"><a className="ps-logo" href="index.html"><img src='images/logo.png' alt="" /></a></div>
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
              <div className="navigation__column right">
                <form className="ps-search--header" action="do_action" method="post">
                  <input className="form-control" type="text" placeholder="Search Product…" />
                  <button><i className="ps-icon-search" /></button>
                </form>
                <div className="ps-cart"><a className="ps-cart__toggle" href="#"><span><i>20</i></span><i className="ps-icon-shopping-cart" /></a>
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
                <div className="menu-toggle"><span /></div>
              </div>
            </div>
          </nav>
        </header>
        <div class="header-services">
          <div class="ps-services owl-slider">
            <OwlCarousel items={1} margin={0} autoplay={true} loop={true} dots={false} nav={false}>

              <p class="ps-service"><i class="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
              <p class="ps-service"><i class="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
              <p class="ps-service"><i class="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
            </OwlCarousel>
          </div>
        </div>
        <main className="ps-main">
          <div className="ps-banner">
            <div className="rev_slider fullscreenbanner" id="home-banner">
              <ul className="ps-banner">
                <li data-index="rs-29723" data-transition="random" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-easein="default" data-easeout="default" data-masterspeed="default" data-rotate="0" data-saveperformance="off"><img className="rev-slidebg" src={prod?.[0]?.images[0]} alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" data-no-retina />
                  <div className="tp-caption ps-banner__header" id="layer4" data-x="left" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-150','-60','-70','-70']" data-width="['none','none','none','400']" data-type="text" data-responsive_offset="on" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>March 2017 <br /> BASKETBALL FASHION</p>
                  </div>
                  <div className="tp-caption ps-banner__title" id="layer24" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-60','0','0','0']" data-type="text" data-responsive_offset="on" data-textAlign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>CLOTHING</p>
                  </div>
                  <div className="tp-caption ps-banner__description" id="layer2-14" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['30','0','0','0']" data-type="text" data-responsive_offset="on" data-textAlign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>Supa wanted something that was going to rep his East Coast <br /> roots and, more specifically, his hometown of  New York City in a big way.</p>
                  </div><a className="tp-caption ps-btn" id="layer34" href="#" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['120','60','70','70']" data-type="text" data-responsive_offset="on" data-textAlign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">Purchase Now<i className="ps-icon-next"></i></a>
                </li>
                <li class="ps-banner ps-banner--white" data-index="rs-100" data-transition="random" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-rotate="0"><img class="rev-slidebg" src={prod?.[0]?.images[1]} alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" data-no-retina />
                  <div class="tp-caption ps-banner__header" id="layer20" data-x="left" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-150','-120','-150','-170']" data-width="['none','none','none','400']" data-type="text" data-responsive_offset="on" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>BEST ITEM <br /> THIS SUMMER</p>
                  </div>
                  <div class="tp-caption ps-banner__title" id="layer339" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-60','-40','-50','-70']" data-type="text" data-responsive_offset="on" data-textAlign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p class="text-uppercase">Recovery</p>
                  </div>
                  <div class="tp-caption ps-banner__description" id="layer2-14" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['30','50','50','50']" data-type="text" data-responsive_offset="on" data-textAlign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>Supa wanted something that was going to rep his East Coast <br /> roots and, more specifically, his hometown of  New York City in  a big way.</p>
                  </div><a class="tp-caption ps-btn" id="layer364" href="#" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['120','140','200','200']" data-type="text" data-responsive_offset="on" data-textAlign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">Purchase Now<i class="ps-icon-next"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="ps-section masonry-root pt-80 pb-40">
            <div className="ps-container">
              <div className="ps-section__header mb-50">
                <h3 className="ps-section__title" data-mask="Promotion">- Our Event</h3>
              </div>
              <div className="ps-section__content pb-50">
                <div className="masonry-wrapper" data-col-md="3" data-col-sm="2" data-col-xs="1" data-gap="30" data-radio="100%">
                  <div className="ps-masonry">
                    <div className="grid-sizer"></div>
                    <div className="grid-item">
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images[0]} alt="" /></a></div>
                    </div>
                    <div className="grid-item">
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images[1]} alt="" /></a></div>
                    </div>
                    <div className="grid-item high">
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images[4]} alt="" /></a></div>
                    </div>
                    <div className="grid-item">
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images[2]} alt="" /></a></div>
                    </div>
                    <div className="grid-item">
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images[3]} alt="" /></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-section--features-product ps-section masonry-root pt-40 pb-80">
            <div className="ps-container">
              <div className="ps-section__header mb-50">
                <h3 className="ps-section__title" data-mask="features">- New Product</h3>
                <ul className="ps-masonry__filter">
                  <li className="current"><a href="#" data-filter="*">All <sup>{products.length}</sup></a></li>
                  <li><a href="#" data-filter=".men">Men <sup>1</sup></a></li>
                  <li><a href="#" data-filter=".women">Women <sup>1</sup></a></li>
                  <li><a href="#" data-filter=".shoes">Shoes <sup>4</sup></a></li>
                </ul>
              </div>
              <div className="ps-section__content pb-50">
                <div className="masonry-wrapper" data-col-md="4" data-col-sm="2" data-col-xs="1" data-gap="30" data-radio="100%">
                  <div className="ps-masonry">
                    <div className="grid-sizer"></div>
                    {products.map((item) => (
                      <div className="grid-item kids" style={{ float: 'left' }}>
                        <div className="grid-item__content-wrapper">
                          <div className="ps-shoe mb-30">
                            <div className="ps-shoe__thumbnail">
                              {/* <div className="ps-badge"><span>New</span></div> */}
                              {/* <div className="ps-badge ps-badge--sale ps-badge--2nd">
                                <span>-35%</span>
                                </div> */}
                              <a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src={item.images[0]} alt="" /><a className="ps-shoe__overlay" onClick={() => handleDes(item.id)}></a>
                            </div>
                            <div className="ps-shoe__content">
                              <div className="ps-shoe__variants">
                                <div className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                  <div className='owl-stage-outer'>
                                    <OwlCarousel items={4} autoplay={true} dots={false} nav={false}>
                                      <img src={item.images[0]} alt="" /><img src={item.images[1]} alt="" /><img src={item.images[2]} alt="" /><img src={item.images[3]} alt="" />
                                    </OwlCarousel></div></div>
                                {/* <select className="ps-rating ps-shoe__rating">
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                      <option value="1">4</option>
                                      <option value="2">5</option>
                                    </select> */}


                              </div>
                              <div className="ps-shoe__detail"><a className="ps-shoe__name" href="#">{item.name}</a>
                                <p className="ps-shoe__categories"><a href="#">
                                  {item.gender} shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">
                                  <del>₹{item.original_price}</del> ₹{item.final_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {products.map((item) => {
                      if(item.category==="shoes")
                      return(
                      <div className="grid-item shoes">
                        <div className="grid-item__content-wrapper">
                          <div className="ps-shoe mb-30">
                            <div className="ps-shoe__thumbnail"><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src={item.images[0]} alt="" /><a className="ps-shoe__overlay"  onClick={() => handleDes(item.id)}></a>
                            </div>
                            <div className="ps-shoe__content">
                              <div className="ps-shoe__variants">
                              <div className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                <div className='owl-stage-outer'>
                                  <OwlCarousel items={4} autoplay={true} dots={false} nav={false}>
                                    <img src={item.images[0]} alt="" /><img src={item.images[1]} alt="" /><img src={item.images[2]} alt="" /><img src={item.images[3]} alt="" />
                                  </OwlCarousel></div></div>
                              </div>
                              <div className="ps-shoe__detail"><a className="ps-shoe__name" href="#">{item.name}</a>
                                <p className="ps-shoe__categories"><a href="#">{item.gender} shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">₹{item.current_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}

                    {products.map((item) => {
                      if(item.gender==="MEN")
                      return(
                      <div className="grid-item men">
                        <div className="grid-item__content-wrapper">
                          <div className="ps-shoe mb-30">
                            <div className="ps-shoe__thumbnail"><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src={item.images[0]} alt="" /><a className="ps-shoe__overlay"  onClick={() => handleDes(item.id)}></a>
                            </div>
                            <div className="ps-shoe__content">
                              <div className="ps-shoe__variants">
                              <div className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                <div className='owl-stage-outer'>
                                  <OwlCarousel items={4} autoplay={true} dots={false} nav={false}>
                                    <img src={item.images[0]} alt="" /><img src={item.images[1]} alt="" /><img src={item.images[2]} alt="" /><img src={item.images[3]} alt="" />
                                  </OwlCarousel></div></div>
                              </div>
                              <div className="ps-shoe__detail"><a className="ps-shoe__name" href="#">{item.name}</a>
                                <p className="ps-shoe__categories"><a href="#">{item.gender} shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">₹{item.current_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}

                    
                    {products.map((item) => {
                      if(item.gender==="WOMEN")
                      return(
                      <div className="grid-item women">
                        <div className="grid-item__content-wrapper">
                          <div className="ps-shoe mb-30">
                            <div className="ps-shoe__thumbnail"><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src={item.images[0]} alt="" /><a className="ps-shoe__overlay" onClick={() => handleDes(item.id)}></a>
                            </div>
                            <div className="ps-shoe__content">
                              <div className="ps-shoe__variants">
                              <div className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                <div className='owl-stage-outer'>
                                  <OwlCarousel items={4} autoplay={true} dots={false} nav={false}>
                                    <img src={item.images[0]} alt="" /><img src={item.images[1]} alt="" /><img src={item.images[2]} alt="" /><img src={item.images[3]} alt="" />
                                  </OwlCarousel></div></div>
                              </div>
                              <div className="ps-shoe__detail"><a className="ps-shoe__name" href="#">{item.name}</a>
                                <p className="ps-shoe__categories"><a href="#">{item.gender} shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">₹{item.current_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ps-home-testimonial bg--parallax pb-80" data-background={prod?.[1].images[0]} style={{ background: `url(${prod?.[1].images[0]})` }}>

            <div className="container">


              <OwlCarousel items={1} autoplay={true} dots={false} nav={false}>

                <div className="ps-testimonial item kuhoo">
                  <div className="ps-testimonial__thumbnail"><img src="images/testimonial/1.jpg" alt="" /><i className="fa fa-quote-left"></i></div>
                  <header>
                    <select className="ps-rating">
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>Logan May - CEO & Founder Invision</p>
                  </header>
                  <footer>
                    <p>“Dessert pudding dessert jelly beans cupcake sweet caramels gingerbread. Fruitcake biscuit cheesecake. Cookie topping sweet muffin pudding tart bear claw sugar plum croissant. “</p>
                  </footer>
                </div>
                <div className="ps-testimonial item">
                  <div className="ps-testimonial__thumbnail"><img src="images/testimonial/2.jpg" alt="" /><i className="fa fa-quote-left"></i></div>
                  <header>
                    <select className="ps-rating">
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>Logan May - CEO & Founder Invision</p>
                  </header>
                  <footer>
                    <p>“Dessert pudding dessert jelly beans cupcake sweet caramels gingerbread. Fruitcake biscuit cheesecake. Cookie topping sweet muffin pudding tart bear claw sugar plum croissant. “</p>
                  </footer>
                </div>
                <div className="ps-testimonial item">
                  <div className="ps-testimonial__thumbnail"><img src="images/testimonial/3.jpg" alt="" /><i className="fa fa-quote-left"></i></div>
                  <header>
                    <select className="ps-rating">
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>Logan May - CEO & Founder Invision</p>
                  </header>
                  <footer>
                    <p>“Dessert pudding dessert jelly beans cupcake sweet caramels gingerbread. Fruitcake biscuit cheesecake. Cookie topping sweet muffin pudding tart bear claw sugar plum croissant. “</p>
                  </footer>
                </div>
              </OwlCarousel>

            </div>
          </div>
          <div className="ps-section ps-owl-root ps-hotdeal--2 pt-80 pb-80">
            <div className="ps-container">
              <div className="ps-section__header mb-50">
                <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 ">
                    <h3 className="ps-section__title" data-mask="SALE OFF">- HOT DEAL TODAY</h3>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
                    <div className="ps-owl-actions"><a className="ps-prev" href="#"><i className="ps-icon-arrow-right"></i>Prev</a><a className="ps-next" href="#">Next<i className="ps-icon-arrow-left"></i></a></div>
                  </div>
                </div>
              </div>
              <div className="ps-section__content">
                <div className="row">
                  <div className="ps-owl--collection owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="50000" data-owl-gap="30" data-owl-nav="false" data-owl-dots="false" data-owl-item="2" data-owl-item-xs="1" data-owl-item-sm="1" data-owl-item-md="2" data-owl-item-lg="2" data-owl-duration="1000" data-owl-mousedrag="on">
                    <OwlCarousel items={2} autoplay={true} dots={false} nav={false}>
                      <div className="ps-product--hotdeal">
                        <div className="ps-product__thumbnail"><a className="ps-product__overlay" href="product-detail.html"></a><img src="images/offer/clothes-1.jpg" alt="" /></div>
                        <div className="ps-product__content"><a className="ps-product__title" href="product-detail.html">Slim Fit Men Sport Hoodie</a>
                          <p className="ps-product__price">Only: <span>£155</span></p>
                          <div className="ps-product__status">
                            <div className="sold">Already sold: <span>10</span></div>
                            <div className="avaiable">avaiable: <span>30</span></div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}></div>
                          </div>
                          <ul className="ps-countdown" data-time="December 1, 2017 00:00:00">
                            <li><span className="hours"></span><p>Hours</p></li>
                            <li className="divider">:</li>
                            <li><span className="minutes"></span><p>minutes</p></li>
                            <li className="divider">:</li>
                            <li><span className="seconds"></span><p>Seconds</p></li>
                          </ul><a className="ps-btn" href="cart.html">Order Today<i className="ps-icon-next"></i></a>
                        </div>
                      </div>
                    </OwlCarousel>
                    <div className="ps-product--hotdeal">
                      <div className="ps-product__thumbnail"><a className="ps-product__overlay" href="product-detail.html"></a><img src="images/offer/clothes-2.jpg" alt="" /></div>
                      <div className="ps-product__content"><a className="ps-product__title" href="product-detail.html">Mens Long-sleeved Polos</a>
                        <p className="ps-product__price">Only: <span>£79</span></p>
                        <div className="ps-product__status">
                          <div className="sold">Already sold: <span>10</span></div>
                          <div className="avaiable">avaiable: <span>30</span></div>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}></div>
                        </div>
                        <ul className="ps-countdown" data-time="May 1, 2018 00:00:00">
                          <li><span className="hours"></span><p>Hours</p></li>
                          <li className="divider">:</li>
                          <li><span className="minutes"></span><p>minutes</p></li>
                          <li className="divider">:</li>
                          <li><span className="seconds"></span><p>Seconds</p></li>
                        </ul><a className="ps-btn" href="cart.html">Order Today<i className="ps-icon-next"></i></a>
                      </div>
                    </div>
                    <div className="ps-product--hotdeal">
                      <div className="ps-product__thumbnail"><a className="ps-product__overlay" href="product-detail.html"></a><img src="images/offer/clothes-1.jpg" alt="" /></div>
                      <div className="ps-product__content"><a className="ps-product__title" href="product-detail.html">Slim Fit Men Sport Hoodie</a>
                        <p className="ps-product__price">Only: <span>£155</span></p>
                        <div className="ps-product__status">
                          <div className="sold">Already sold: <span>10</span></div>
                          <div className="avaiable">avaiable: <span>30</span></div>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}></div>
                        </div>
                        <ul className="ps-countdown" data-time="December 1, 2017 00:00:00">
                          <li><span className="hours"></span><p>Hours</p></li>
                          <li className="divider">:</li>
                          <li><span className="minutes"></span><p>minutes</p></li>
                          <li className="divider">:</li>
                          <li><span className="seconds"></span><p>Seconds</p></li>
                        </ul><a className="ps-btn" href="cart.html">Order Today<i className="ps-icon-next"></i></a>
                      </div>
                    </div>
                    <div className="ps-product--hotdeal">
                      <div className="ps-product__thumbnail"><a className="ps-product__overlay" href="product-detail.html"></a><img src="images/offer/clothes-2.jpg" alt="" /></div>
                      <div className="ps-product__content"><a className="ps-product__title" href="product-detail.html">Mens Long-sleeved Polos</a>
                        <p className="ps-product__price">Only: <span>£79</span></p>
                        <div className="ps-product__status">
                          <div className="sold">Already sold: <span>10</span></div>
                          <div className="avaiable">avaiable: <span>30</span></div>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}></div>
                        </div>
                        <ul className="ps-countdown" data-time="May 1, 2018 00:00:00">
                          <li><span className="hours"></span><p>Hours</p></li>
                          <li className="divider">:</li>
                          <li><span className="minutes"></span><p>minutes</p></li>
                          <li className="divider">:</li>
                          <li><span className="seconds"></span><p>Seconds</p></li>
                        </ul><a className="ps-btn" href="cart.html">Order Today<i className="ps-icon-next"></i></a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="ps-features pt-80 pb-80">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                  <div className="ps-iconbox">
                    <div className="ps-iconbox__header"><i className="ps-icon-delivery"></i>
                      <h3>Free shipping</h3>
                      <p>ON ORDER OVER $199</p>
                    </div>
                    <div className="ps-iconbox__content">
                      <p>Want to track a package? Find tracking information and order details from Your Orders.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                  <div className="ps-iconbox">
                    <div className="ps-iconbox__header"><i className="ps-icon-money"></i>
                      <h3>100% MONEY BACK.</h3>
                      <p>WITHIN 30 DAYS AFTER DELIVERY.</p>
                    </div>
                    <div className="ps-iconbox__content">
                      <p>You may return most new, unopened items sold within 30 days of delivery for a full refund.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                  <div className="ps-iconbox">
                    <div className="ps-iconbox__header"><i className="ps-icon-customer-service"></i>
                      <h3>SUPPORT 24/7.</h3>
                      <p>WE CAN HELP YOU ONLINE.</p>
                    </div>
                    <div className="ps-iconbox__content">
                      <p>We offer a 24/7 customer hotline so you’re never alone if you have a question.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-section ps-home-blog pt-80 pb-80">
            <div className="ps-container">
              <div className="ps-section__header mb-50">
                <h2 className="ps-section__title" data-mask="News">- Our Story</h2>
                <div className="ps-section__action"><a className="ps-morelink text-uppercase" href="#">View all post<i className="fa fa-long-arrow-right"></i></a></div>
              </div>
              <div className="ps-section__content">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      <div className="ps-post__thumbnail"><a className="ps-post__overlay" href="blog-detail.html"></a><img src="images/blog/1.jpg" alt="" /></div>
                      <div className="ps-post__content"><a className="ps-post__title" href="blog-detail.html">An Inside Look at the Breaking2 Kit</a>
                        <p className="ps-post__meta"><span>By:<a className="mr-5" href="blog.html">Alena Studio</a></span> -<span className="ml-5">Jun 10, 2017</span></p>
                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further…</p><a className="ps-morelink" href="blog-detail.html">Read more<i className="fa fa-long-arrow-right"></i></a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      <div className="ps-post__thumbnail"><a className="ps-post__overlay" href="blog-detail.html"></a><img src="images/blog/2.jpg" alt="" /></div>
                      <div className="ps-post__content"><a className="ps-post__title" href="blog-detail.html">Unpacking the Breaking2 Race Strategy</a>
                        <p className="ps-post__meta"><span>By:<a className="mr-5" href="blog.html">Alena Studio</a></span> -<span className="ml-5">Jun 10, 2017</span></p>
                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further…</p><a className="ps-morelink" href="blog-detail.html">Read more<i className="fa fa-long-arrow-right"></i></a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      <div className="ps-post__thumbnail"><a className="ps-post__overlay" href="blog-detail.html"></a><img src="images/blog/3.jpg" alt="" /></div>
                      <div className="ps-post__content"><a className="ps-post__title" href="blog-detail.html">Nike’s Latest Football Cleat Breaks the Mold</a>
                        <p className="ps-post__meta"><span>By:<a className="mr-5" href="blog.html">Alena Studio</a></span> -<span className="ml-5">Jun 10, 2017</span></p>
                        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further…</p><a className="ps-morelink" href="blog-detail.html">Read more<i className="fa fa-long-arrow-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-home-partner">
            <div className="ps-container">
              <div className="owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="5000" data-owl-gap="40" data-owl-nav="false" data-owl-dots="false" data-owl-item="6" data-owl-item-xs="2" data-owl-item-sm="4" data-owl-item-md="5" data-owl-item-lg="6" data-owl-duration="1000" data-owl-mousedrag="on">

                <OwlCarousel items={6} autoplay={true} dots={false} margin={40} nav={false}>

                  <a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/1.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/2.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/3.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/4.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/5.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/6.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/7.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/8.png" alt="" /></a>
                </OwlCarousel>
              </div>
            </div>
          </div>
          <div className="ps-home-contact">
            <div id="contact-map" data-address="New York, NY" data-title="BAKERY LOCATION!" data-zoom="17"></div>
            <div className="ps-home-contact__form">
              <header>
                <h3>Contact Us</h3>
                <p>Learn about our company profile, communityimpact, sustainable motivation, and more.</p>
              </header>
              <footer>
                <form action="product-listing.html" method="post">
                  <div className="form-group">
                    <label>Name<span>*</span></label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group">
                    <label>Email<span>*</span></label>
                    <input className="form-control" type="email" />
                  </div>
                  <div className="form-group">
                    <label>Your message<span>*</span></label>
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                  <div className="form-group text-center">
                    <button className="ps-btn">Send Message<i className="fa fa-angle-right"></i></button>
                  </div>
                </form>
              </footer>
            </div>
          </div>
          <div className="ps-subscribe">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                  <h3><i className="fa fa-envelope"></i>Sign up to Newsletter</h3>
                </div>
                <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12 ">
                  <form className="ps-subscribe__form" action="do_action" method="post">
                    <input className="form-control" type="text" placeholder="" />
                    <button>Sign up now</button>
                  </form>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 ">
                  <p>...and receive  <span>$20</span>  coupon for first shopping.</p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </body>
      <Footer />
    </React.Fragment>
  );
}



export default Homepage;