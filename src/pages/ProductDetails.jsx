import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../redux/DataReducer/action";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OwlCarousel from 'react-owl-carousel';



const ProductDetails=()=>{
    const { id } = useParams();
    let navigate = useNavigate();
    const products = useSelector((store) => store.dataReducer.products);
    const dispatch = useDispatch();

    

    const [currentProducts, setCurrentProducts] = useState({});
    const [currentProducts1, setCurrentProducts1] = useState({});

    let num = useState({});

    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
      useEffect(() => {
        if (id) {
          const cur = products.find((item) => item.id === Number(id));
          const cur2 = products.find((item) => item.gender === "MEN");
          console.log(cur2,'cur2',cur);
          cur && setCurrentProducts(cur);
          cur2 && setCurrentProducts1(cur2);
        }
      }, [id, products,dispatch,num]);

      const imgg=currentProducts.images;


    return (

          
      <body className="ps-loading">
    <div className="header--sidebar"></div>
    <header className="header">
      <div className="header__top">
        <div className="container-fluid">
          <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-6 col-xs-12 ">
                  <p>460 West 34th Street, 15th floor, New York  -  Hotline: 804-377-3580 - 804-399-3580</p>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 ">
                  <div className="header__actions"><a href="#">Login & Regiser</a>
                    <div className="btn-group ps-dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">USD<i className="fa fa-angle-down"></i></a>
                      <ul className="dropdown-menu">
                        <li><a href="#"><img src="images/flag/usa.svg" alt=""/> USD</a></li>
                        <li><a href="#"><img src="images/flag/singapore.svg" alt=""/> SGD</a></li>
                        <li><a href="#"><img src="images/flag/japan.svg" alt=""/> JPN</a></li>
                      </ul>
                    </div>
                    <div className="btn-group ps-dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Language<i className="fa fa-angle-down"></i></a>
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
            <div className="header__logo"><a className="ps-logo" onClick={()=>navigate("/")} style={{cursor: "pointer"}}><img src="images/logo.png" alt=""/></a></div>
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
                            <li><a href="product-listing.html">Training & Gym</a></li>
                            <li><a href="product-listing.html">Basketball</a></li>
                            <li><a href="product-listing.html">Football</a></li>
                            <li><a href="product-listing.html">Soccer</a></li>
                            <li><a href="product-listing.html">Baseball</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">CLOTHING</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">Compression & Nike Pro</a></li>
                            <li><a href="product-listing.html">Tops & T-Shirts</a></li>
                            <li><a href="product-listing.html">Polos</a></li>
                            <li><a href="product-listing.html">Hoodies & Sweatshirts</a></li>
                            <li><a href="product-listing.html">Jackets & Vests</a></li>
                            <li><a href="product-listing.html">Pants & Tights</a></li>
                            <li><a href="product-listing.html">Shorts</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">Accessories</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">Compression & Nike Pro</a></li>
                            <li><a href="product-listing.html">Tops & T-Shirts</a></li>
                            <li><a href="product-listing.html">Polos</a></li>
                            <li><a href="product-listing.html">Hoodies & Sweatshirts</a></li>
                            <li><a href="product-listing.html">Jackets & Vests</a></li>
                            <li><a href="product-listing.html">Pants & Tights</a></li>
                            <li><a href="product-listing.html">Shorts</a></li>
                          </ul>
                        </div>
                        <div className="mega-column">
                          <h4 className="mega-heading">BRAND</h4>
                          <ul className="mega-item">
                            <li><a href="product-listing.html">NIKE</a></li>
                            <li><a href="product-listing.html">Adidas</a></li>
                            <li><a href="product-listing.html">Dior</a></li>
                            <li><a href="product-listing.html">B&G</a></li>
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
              <input className="form-control" type="text" placeholder="Search Product…"/>
              <button><i className="ps-icon-search"></i></button>
            </form>
            <div className="ps-cart"><a className="ps-cart__toggle" href="#"><span><i>20</i></span><i className="ps-icon-shopping-cart"></i></a>
              <div className="ps-cart__listing">
                <div className="ps-cart__content">
                  <div className="ps-cart-item"><a className="ps-cart-item__close" href="#"></a>
                    <div className="ps-cart-item__thumbnail"><a href="product-detail.html"></a><img src="images/cart-preview/1.jpg" alt=""/></div>
                    <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">Amazin’ Glazin’</a>
                      <p><span>Quantity:<i>12</i></span><span>Total:<i>£176</i></span></p>
                    </div>
                  </div>
                  <div className="ps-cart-item"><a className="ps-cart-item__close" href="#"></a>
                    <div className="ps-cart-item__thumbnail"><a href="product-detail.html"></a><img src="images/cart-preview/2.jpg" alt=""/></div>
                    <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">The Crusty Croissant</a>
                      <p><span>Quantity:<i>12</i></span><span>Total:<i>£176</i></span></p>
                    </div>
                  </div>
                  <div className="ps-cart-item"><a className="ps-cart-item__close" href="#"></a>
                    <div className="ps-cart-item__thumbnail"><a href="product-detail.html"></a><img src="images/cart-preview/3.jpg" alt=""/></div>
                    <div className="ps-cart-item__content"><a className="ps-cart-item__title" href="product-detail.html">The Rolling Pin</a>
                      <p><span>Quantity:<i>12</i></span><span>Total:<i>£176</i></span></p>
                    </div>
                  </div>
                </div>
                <div className="ps-cart__total">
                  <p>Number of items:<span>36</span></p>
                  <p>Item Total:<span>£528.00</span></p>
                </div>
                <div className="ps-cart__footer"><a className="ps-btn" href="cart.html">Check out<i className="ps-icon-arrow-left"></i></a></div>
              </div>
            </div>
            <div className="menu-toggle"><span></span></div>
          </div>
        </div>
      </nav>
    </header>
    <div className="header-services">
      <div className="ps-services owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="7000" data-owl-gap="0" data-owl-nav="true" data-owl-dots="false" data-owl-item="1" data-owl-item-xs="1" data-owl-item-sm="1" data-owl-item-md="1" data-owl-item-lg="1" data-owl-duration="1000" data-owl-mousedrag="on">
      <OwlCarousel items={1} margin={0} autoplay={true} loop={true} dots={false} nav={false}>

        <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
        <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
        <p className="ps-service"><i className="ps-icon-delivery"></i><strong>Free delivery</strong>: Get free standard delivery on every order with Shoe Store</p>
        </OwlCarousel>
      </div>
    </div>
    <main className="ps-main">
      <div className="test">
        <div className="container">
          <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
                </div>
          </div>
        </div>
      </div>
      <div className="ps-product--detail pt-60">
        <div className="ps-container">
          <div className="row">
            <div className="col-lg-10 col-md-12 col-lg-offset-1">
              <div className="ps-product__thumbnail">
                <div className="ps-product__preview">
                  <div className="ps-product__variants">
                    <div className="item"><img src={imgg?.[0]? imgg[0]:"images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={imgg?.[1]? imgg[1]:"images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={imgg?.[2]? imgg[2]:"images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={imgg?.[3]? imgg[3]:"images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={imgg?.[4]? imgg[4]:"images/shoe-detail/2.jpg"} alt=""/></div>
                  </div><a className="popup-youtube ps-product__video" href="http://www.youtube.com/watch?v=0O2aH4XLbto"><img src={currentProducts?.images?.[0]} alt=""/><i className="fa fa-play"></i></a>
                </div>
                <div className="ps-product__image">
                  <div className="item"><img className="zoom" src={currentProducts?.images?.[0]} alt="" data-zoom-image={currentProducts?.images?.[0]}/></div>
                  <div className="item"><img className="zoom" src={currentProducts?.images?.[1]} alt="" data-zoom-image={currentProducts?.images?.[1]}/></div>
                  <div className="item"><img className="zoom" src={currentProducts?.images?.[2]} alt="" data-zoom-image={currentProducts?.images?.[2]}/></div>
                  <div className="item"><img className="zoom" src={currentProducts?.images?.[3]} alt="" data-zoom-image={currentProducts?.images?.[3]}/></div>
                  <div className="item"><img className="zoom" src={currentProducts?.images?.[4]} alt="" data-zoom-image={currentProducts?.images?.[4]}/></div>
                </div>
              </div>
              <div className="ps-product__thumbnail--mobile">
                <div className="ps-product__main-img"><img src={currentProducts.images?.[0]} alt=""/></div>
                <div className="ps-product__preview owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="5000" data-owl-gap="20" data-owl-nav="true" data-owl-dots="false" data-owl-item="3" data-owl-item-xs="3" data-owl-item-sm="3" data-owl-item-md="3" data-owl-item-lg="3" data-owl-duration="1000" data-owl-mousedrag="on">
                <OwlCarousel items={3} margin={20} autoplay={true} loop={true} dots={false} nav={false}>
                  <img src={currentProducts?.images?.[0]} alt=""/><img src={currentProducts?.images?.[1]} alt=""/><img src={currentProducts?.images?.[2]} alt=""/>
                  </OwlCarousel>
                  </div>
              </div>
              <div className="ps-product__info">
                <div className="ps-product__rating">
                  <select className="ps-rating">
                    <option value="1">1</option>
                    <option value="1">2</option>
                    <option value="1">3</option>
                    <option value="1">4</option>
                    <option value="2">5</option>
                  </select><a href="#">(Read all 8 reviews)</a>
                </div>
                <h1>{currentProducts?.name}</h1>
                <p className="ps-product__category"><a href="#"> Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p>
                <h3 className="ps-product__price">₹{currentProducts?.final_price}  <del>₹{currentProducts?.original_price}</del></h3>
                <div className="ps-product__block ps-product__quickview">
                  <h4>QUICK REVIEW</h4>
                  <p>The Nike Free RN 2017 Men's Running Shoe weighs less than previous versions and features an updated knit material…</p>
                </div>
                <div className="ps-product__block ps-product__style">
                  <h4>CHOOSE YOUR STYLE</h4>
                  <ul>
                    <li><a href="product-detail.html"><img src={currentProducts?.images?.[0]} alt=""/></a></li>
                    <li><a href="product-detail.html"><img src={currentProducts?.images?.[1]} alt=""/></a></li>
                    <li><a href="product-detail.html"><img src={currentProducts?.images?.[2]} alt=""/></a></li>
                    <li><a href="product-detail.html"><img src={currentProducts?.images?.[3]} alt=""/></a></li>
                  </ul>
                </div>
                <div className="ps-product__block ps-product__size">
                  <h4>CHOOSE SIZE<a href="#">Size chart</a></h4>
                  <select className="ps-select selectpicker">
                    <option value="1">Select Size</option>
                    <option value="2">4</option>
                    <option value="3">4.5</option>
                    <option value="3">5</option>
                    <option value="3">6</option>
                    <option value="3">6.5</option>
                    <option value="3">7</option>
                    <option value="3">7.5</option>
                    <option value="3">8</option>
                    <option value="3">8.5</option>
                    <option value="3">9</option>
                    <option value="3">9.5</option>
                    <option value="3">10</option>
                  </select>
                  <div className="form-group">
                    <input className="form-control" type="number" value="1"/>
                  </div>
                </div>
                <div className="ps-product__shopping"><a className="ps-btn mb-10" href="cart.html">Add to cart<i className="ps-icon-next"></i></a>
                  <div className="ps-product__actions"><a className="mr-10" href="whishlist.html"><i className="ps-icon-heart"></i></a><a href="compare.html"><i className="ps-icon-share"></i></a></div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="ps-product__content mt-50">
                <ul className="tab-list" role="tablist">
                  <li className="active"><a href="#tab_01" aria-controls="tab_01" role="tab" data-toggle="tab">Overview</a></li>
                  <li><a href="#tab_02" aria-controls="tab_02" role="tab" data-toggle="tab">Review</a></li>
                  <li><a href="#tab_03" aria-controls="tab_03" role="tab" data-toggle="tab">PRODUCT TAG</a></li>
                  <li><a href="#tab_04" aria-controls="tab_04" role="tab" data-toggle="tab">ADDITIONAL</a></li>
                </ul>
              </div>
              <div className="tab-content mb-60">
                <div className="tab-pane active" role="tabpanel" id="tab_01">
                  <p>Caramels tootsie roll carrot cake sugar plum. Sweet roll jelly bear claw liquorice. Gingerbread lollipop dragée cake. Pie topping jelly-o. Fruitcake dragée candy canes tootsie roll. Pastry jelly-o cupcake. Bonbon brownie soufflé muffin.</p>
                  <p>Sweet roll soufflé oat cake apple pie croissant. Pie gummi bears jujubes cake lemon drops gummi bears croissant macaroon pie. Fruitcake tootsie roll chocolate cake Carrot cake cake bear claw jujubes topping cake apple pie. Jujubes gummi bears soufflé candy canes topping gummi bears cake soufflé cake. Cotton candy soufflé sugar plum pastry sweet roll..</p>
                </div>
                <div className="tab-pane" role="tabpanel" id="tab_02">
                  <p className="mb-20">1 review for <strong>Shoes Air Jordan</strong></p>
                  <div className="ps-review">
                    <div className="ps-review__thumbnail"><img src="images/user/1.jpg" alt=""/></div>
                    <div className="ps-review__content">
                      <header>
                        <select className="ps-rating">
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                          <option value="5">5</option>
                        </select>
                        <p>By<a href=""> Alena Studio</a> - November 25, 2017</p>
                      </header>
                      <p>Soufflé danish gummi bears tart. Pie wafer icing. Gummies jelly beans powder. Chocolate bar pudding macaroon candy canes chocolate apple pie chocolate cake. Sweet caramels sesame snaps halvah bear claw wafer. Sweet roll soufflé muffin topping muffin brownie. Tart bear claw cake tiramisu chocolate bar gummies dragée lemon drops brownie.</p>
                    </div>
                  </div>
                  <form className="ps-product__review" action="_action" method="post">
                    <h4>ADD YOUR REVIEW</h4>
                    <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <div className="form-group">
                              <label>Name:<span>*</span></label>
                              <input className="form-control" type="text" placeholder=""/>
                            </div>
                            <div className="form-group">
                              <label>Email:<span>*</span></label>
                              <input className="form-control" type="email" placeholder=""/>
                            </div>
                            <div className="form-group">
                              <label>Your rating<span></span></label>
                              <select className="ps-rating">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12 ">
                            <div className="form-group">
                              <label>Your Review:</label>
                              <textarea className="form-control" rows="6"></textarea>
                            </div>
                            <div className="form-group">
                              <button className="ps-btn ps-btn--sm">Submit<i className="ps-icon-next"></i></button>
                            </div>
                          </div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" role="tabpanel" id="tab_03">
                  <p>Add your tag <span> *</span></p>
                  <form className="ps-product__tags" action="_action" method="post">
                    <div className="form-group">
                      <input className="form-control" type="text" placeholder=""/>
                      <button className="ps-btn ps-btn--sm">Add Tags</button>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" role="tabpanel" id="tab_04">
                  <div className="form-group">
                    <textarea className="form-control" rows="6" placeholder="Enter your addition here..."></textarea>
                  </div>
                  <div className="form-group">
                    <button className="ps-btn" type="button">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ps-section ps-section--top-sales ps-owl-root pt-40 pb-80">
        <div className="ps-container">
          <div className="ps-section__header mb-50">
            <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 ">
                    <h3 className="ps-section__title" data-mask="Related item">- YOU MIGHT ALSO LIKE</h3>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                    <div className="ps-owl-actions"><a className="ps-prev" href="#"><i className="ps-icon-arrow-right"></i>Prev</a><a className="ps-next" href="#">Next<i className="ps-icon-arrow-left"></i></a></div>
                  </div>
            </div>
          </div>
          <div className="ps-section__content">
            <div className="ps-owl--colection owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="5000" data-owl-gap="30" data-owl-nav="false" data-owl-dots="false" data-owl-item="4" data-owl-item-xs="1" data-owl-item-sm="2" data-owl-item-md="3" data-owl-item-lg="4" data-owl-duration="1000" data-owl-mousedrag="on">
            <OwlCarousel items={4} margin={30} autoplay={true} loop={true} dots={false} nav={false}>
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail">
                    <div className="ps-badge"><span>New</span></div><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src="images/shoe/1.jpg" alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img src="images/shoe/2.jpg" alt=""/><img src="images/shoe/3.jpg" alt=""/><img src="images/shoe/4.jpg" alt=""/><img src="images/shoe/5.jpg" alt=""/></div>
                      <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                    </div>
                    <div className="ps-shoe__detail"><a className="ps-shoe__name" href="product-detai.html">Air Jordan 7 Retro</a>
                      <p className="ps-shoe__categories"><a href="#">Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price"> £ 120</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail">
                    <div className="ps-badge"><span>New</span></div>
                    <div className="ps-badge ps-badge--sale ps-badge--2nd"><span>-35%</span></div><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src="images/shoe/2.jpg" alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img src="images/shoe/2.jpg" alt=""/><img src="images/shoe/3.jpg" alt=""/><img src="images/shoe/4.jpg" alt=""/><img src="images/shoe/5.jpg" alt=""/></div>
                      <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                    </div>
                    <div className="ps-shoe__detail"><a className="ps-shoe__name" href="product-detai.html">Air Jordan 7 Retro</a>
                      <p className="ps-shoe__categories"><a href="#">Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">
                        <del>£220</del> £ 120</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail">
                    <div className="ps-badge"><span>New</span></div><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src="images/shoe/3.jpg" alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img src="images/shoe/2.jpg" alt=""/><img src="images/shoe/3.jpg" alt=""/><img src="images/shoe/4.jpg" alt=""/><img src="images/shoe/5.jpg" alt=""/></div>
                      <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                    </div>
                    <div className="ps-shoe__detail"><a className="ps-shoe__name" href="product-detai.html">Air Jordan 7 Retro</a>
                      <p className="ps-shoe__categories"><a href="#">Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price"> £ 120</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail"><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src="images/shoe/4.jpg" alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img src="images/shoe/2.jpg" alt=""/><img src="images/shoe/3.jpg" alt=""/><img src="images/shoe/4.jpg" alt=""/><img src="images/shoe/5.jpg" alt=""/></div>
                      <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                    </div>
                    <div className="ps-shoe__detail"><a className="ps-shoe__name" href="product-detai.html">Air Jordan 7 Retro</a>
                      <p className="ps-shoe__categories"><a href="#">Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price"> £ 120</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail">
                    <div className="ps-badge"><span>New</span></div><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src="images/shoe/5.jpg" alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img src="images/shoe/2.jpg" alt=""/><img src="images/shoe/3.jpg" alt=""/><img src="images/shoe/4.jpg" alt=""/><img src="images/shoe/5.jpg" alt=""/></div>
                      <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                    </div>
                    <div className="ps-shoe__detail"><a className="ps-shoe__name" href="product-detai.html">Air Jordan 7 Retro</a>
                      <p className="ps-shoe__categories"><a href="#">Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price"> £ 120</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail"><a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src="images/shoe/6.jpg" alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img src="images/shoe/2.jpg" alt=""/><img src="images/shoe/3.jpg" alt=""/><img src="images/shoe/4.jpg" alt=""/><img src="images/shoe/5.jpg" alt=""/></div>
                      <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select>
                    </div>
                    <div className="ps-shoe__detail"><a className="ps-shoe__name" href="product-detai.html">Air Jordan 7 Retro</a>
                      <p className="ps-shoe__categories"><a href="#">Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price"> £ 120</span>
                    </div>
                  </div>
                </div>
              </div>
              </OwlCarousel>
            </div>
            
          </div>
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
                    <input className="form-control" type="text" placeholder=""/>
                    <button>Sign up now</button>
                  </form>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 ">
                  <p>...and receive  <span>$20</span>  coupon for first shopping.</p>
                </div>
          </div>
        </div>
      </div>
      <div className="ps-footer bg--cover" data-background="images/background/parallax.jpg">
        <div className="ps-footer__content">
          <div className="ps-container">
            <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                    <aside className="ps-widget--footer ps-widget--info">
                      <header><a className="ps-logo" href="index.html"><img src="images/logo-white.png" alt=""/></a>
                        <h3 className="ps-widget__title">Address Office 1</h3>
                      </header>
                      <footer>
                        <p><strong>460 West 34th Street, 15th floor, New York</strong></p>
                        <p>Email: <a href='mailto:support@store.com'>support@store.com</a></p>
                        <p>Phone: +323 32434 5334</p>
                        <p>Fax: ++323 32434 5333</p>
                      </footer>
                    </aside>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                    <aside className="ps-widget--footer ps-widget--info second">
                      <header>
                        <h3 className="ps-widget__title">Address Office 2</h3>
                      </header>
                      <footer>
                        <p><strong>PO Box 16122 Collins  Victoria 3000 Australia</strong></p>
                        <p>Email: <a href='mailto:support@store.com'>support@store.com</a></p>
                        <p>Phone: +323 32434 5334</p>
                        <p>Fax: ++323 32434 5333</p>
                      </footer>
                    </aside>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 ">
                    <aside className="ps-widget--footer ps-widget--link">
                      <header>
                        <h3 className="ps-widget__title">Find Our store</h3>
                      </header>
                      <footer>
                        <ul className="ps-list--link">
                          <li><a href="#">Coupon Code</a></li>
                          <li><a href="#">SignUp For Email</a></li>
                          <li><a href="#">Site Feedback</a></li>
                          <li><a href="#">Careers</a></li>
                        </ul>
                      </footer>
                    </aside>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 ">
                    <aside className="ps-widget--footer ps-widget--link">
                      <header>
                        <h3 className="ps-widget__title">Get Help</h3>
                      </header>
                      <footer>
                        <ul className="ps-list--line">
                          <li><a href="#">Order Status</a></li>
                          <li><a href="#">Shipping and Delivery</a></li>
                          <li><a href="#">Returns</a></li>
                          <li><a href="#">Payment Options</a></li>
                          <li><a href="#">Contact Us</a></li>
                        </ul>
                      </footer>
                    </aside>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12 ">
                    <aside className="ps-widget--footer ps-widget--link">
                      <header>
                        <h3 className="ps-widget__title">Products</h3>
                      </header>
                      <footer>
                        <ul className="ps-list--line">
                          <li><a href="#">Shoes</a></li>
                          <li><a href="#">Clothing</a></li>
                          <li><a href="#">Accessries</a></li>
                          <li><a href="#">Football Boots</a></li>
                        </ul>
                      </footer>
                    </aside>
                  </div>
            </div>
          </div>
        </div>
        <div className="ps-footer__copyright">
          <div className="ps-container">
            <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <p>&copy; <a href="#">NOUTHEMES</a>, Inc. All rights Resevered. Design by <a href="#"> Alena Studio</a></p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <ul className="ps-social">
                      <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
        
      );
}



export default ProductDetails