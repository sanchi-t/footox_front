import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData, getBannerData } from "../redux/DataReducer/action";
import { useEffect, useState,lazy } from "react";
import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import axios from "axios";
import parse from 'html-react-parser';
import { useRef } from 'react';
// import { InstagramEmbed } from 'react-social-media-embed';
import Banner from '../components/Banner';
import { animationControls } from 'framer-motion';
// import Contact from './contact';

const Header=lazy(() =>  import('../components/Header'));
const Footer=lazy(() =>  import('../components/Footer'));
// const Banner=lazy(() =>  import('./Banner'));

const BackendServer = process.env.REACT_APP_API_BASE_URL;

const Homepage = () => {
  const navigate = useNavigate();
  // console.log('state')

  const dispatch = useDispatch();
  const products1 = useSelector((store) => store.dataReducer.products);

  const products = products1.filter(function (el) {
    return el.Quantity !== undefined; 
  });
  // const products = useSelector((store) => store.dataReducer.products);
  const aboutSection = useRef(null);
  const socialSection = useRef(null);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/${id}`);
    window.location.reload();
    window.scrollTo(0,0); 
  };
   const scrollDown = (section) => {
    if(section==='contact'){
      window.scrollTo({
        top: aboutSection.current.offsetTop,
        behavior: 'smooth',
      });

    }
    else if(section==='social'){
      window.scrollTo({
        top: socialSection.current.offsetTop,
        behavior: 'smooth',
      });
    }
    
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
  const [genderFilter, setGenderFilter] = useState('all');
  const [links, setLink] = useState();
  // const parentToChild = () => {
  //   setProd(prod);
  // }

  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}banner`)
      setProd(response.data)
    }
    const l = axiosTest()
  }, [products.length,location])


  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}link`)
      setLink(response.data)
    }
    const l = axiosTest()
  }, [products.length])

  const link1=links?.users[0]?.link1;
  const link2=links?.users[0]?.link2;
  const link3=links?.users[0]?.link3;
  // console.log('sanchit',links?.users[0])
  // console.log('fghjk',link1)
  useEffect(() => {
    dispatch(getData(queryParams));
  }, [])
  // console.log('helloo', products, products1)
  products.sort(function(a,b){
    return new Date(b.modifiedDate) - new Date(a.modifiedDate);
  });

  const handleFilter=(item)=>{
    setGenderFilter(item);
    console.log(item);
    
  }
  // console.log(products,'sort');

  return (
    <React.Fragment>
      <body className="ps-loading">
        <Header scrollDown = {scrollDown}/>
        <main className="ps-main">
          <Banner/>
          <div className='container' >
          
          </div>
          <div className="ps-section--features-product ps-section masonry-root1 pt-40 pb-80"  style={{paddingTop:'2rem',display:'flex'}}>
            <div className="ps-container" >
              <div className="ps-section__header mb-50">
                <h3 className="ps-section__title" data-mask="features">- New Product</h3>
                <ul className="ps-masonry__filter" style={{paddingTop:'05%'}}>
                  <li className={`${genderFilter==='all'?'current':''}`}><a style={{cursor: 'pointer'}}  id='allp123'  onClick={()=>handleFilter('all')}>All <sup>{products.length}</sup></a></li>
                  <li className={`${genderFilter==='men'?'current':''}`}><a style={{cursor: 'pointer'}} onClick={()=>handleFilter('men')}>Men <sup>{(products.filter(x => x.productGender === 'Men')).length}</sup></a></li>
                  <li className={`${genderFilter==='women'?'current':''}`}><a style={{cursor: 'pointer'}} onClick={()=>handleFilter('women')}>Women <sup>{(products.filter(x => x.productGender === 'Women')).length}</sup></a></li>
                  {/* <li><a href='#' data-filter=".shoes">Shoes <sup>4</sup></a></li> */}
                </ul>
              </div>
              <div className="ps-section__content pb-50">
                <div className="masonry-wrapper" data-col-md="4" data-col-sm="2" data-col-xs="1" data-gap="30" data-radio="100%">
                  <div className="ps-masonry">
                  { products.map((item) => {
                      if(item.productGender==="Men" && (genderFilter==='men' || genderFilter==='all'))
                      return(
                        <div className="grid-item men" key={item.id} style={{float: 'left',display:'block',marginBottom:'8rem' }}>
                        <div className="grid-item__content-wrapper" key={item.id} style={{minHeight: "30.0rem",position: 'relative'}}>
                          <div className="ps-shoe mb-30" key={item.id}>
                            <div className="ps-shoe__thumbnail" key={item.id}>
                              {/* <div className="ps-badge"><span>New</span></div> */}
                              {/* <div className="ps-badge ps-badge--sale ps-badge--2nd">
                                <span>-35%</span>
                                </div> */}
                              <a className="ps-shoe__favorite" href="#" key={item.id}><i className="ps-icon-heart" key={item.id}></i></a><img style={{height:'42rem'}} key={item.id} src={item.image?.[0][0]} alt="" /><a className="ps-shoe__overlay" onClick={() => handleDes(item.productId)}></a>
                            </div>
                            <div className="ps-shoe__content" key={item.id}>
                              <div className="ps-shoe__variants" key={item.id}>
                                <div className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded" key={item.id}>
                                  <div className='owl-stage-outer' key={item.id}>
                                    <OwlCarousel items={4} autoplay={true} dots={false} nav={false} key={item.id}>
                                      <img style = {{height : '5.5rem',width :"5.5rem" }} key={item.id} src={item.image?.[0][0]} alt="" /><img style = {{height : '5.5rem',width :"5.5rem" }} key={item.id} src={item.image?.[0][1]} alt="" /><img style = {{height : '5.5rem',width :"5.5rem" }} key={item.id} src={item.image?.[0][2]} alt="" /><img style = {{height : '5.5rem',width :"5.5rem" }} key={item.id} src={item.image?.[0][3]} alt="" />
                                    </OwlCarousel></div></div>
                                {/* <select className="ps-rating ps-shoe__rating">
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                      <option value="1">4</option>
                                      <option value="2">5</option>
                                    </select> */}
                              </div>
                              <div className="ps-shoe__detail" key={item.id} style={{textAlign:'left'}}>
                                <div key={item.id} style={{inlineSize: "15rem",  overflowWrap: "break-word"}}><a className="ps-shoe__name" onClick={() => handleDes(item.productId)}>{item.productName}</a></div>
                                <p key={item.id} className="ps-shoe__categories"><a key={item.id} href="#">
                                  {item.gender} shoes</a>,<a key={item.id} href="#"> Nike</a>,<a key={item.id} href="#"> Jordan</a></p><span key={item.id} className="ps-shoe__price">
                                  <del key={item.id}>₹{item.original_price}</del> ₹{item.selling_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}

                    
                    {products.map((item) => {
                      if(item.productGender==="Women" && (genderFilter==='women' || genderFilter==='all'))
                      return(
                        <div className="grid-item women" key={item.id} style={{float: 'left',display:'block',marginBottom:'8rem' }}>
                        <div className="grid-item__content-wrapper" key={item.id} style={{minHeight: "30rem",position: 'relative'}}>
                          <div className="ps-shoe mb-30" key={item.id}>
                            <div className="ps-shoe__thumbnail" key={item.id}>
                              {/* <div className="ps-badge"><span>New</span></div> */}
                              {/* <div className="ps-badge ps-badge--sale ps-badge--2nd">
                                <span>-35%</span>
                                </div> */}
                              <a className="ps-shoe__favorite" key={item.id} href="#"><i key={item.id} className="ps-icon-heart"></i></a><img style={{height:'42rem'}} key={item.id} src={item.image?.[0][0]} alt="" /><a key={item.id} className="ps-shoe__overlay" onClick={() => handleDes(item.productId)}></a>
                            </div>
                            <div key={item.id} className="ps-shoe__content">
                              <div key={item.id} className="ps-shoe__variants">
                                <div key={item.id} className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                  <div key={item.id} className='owl-stage-outer'>
                                    <OwlCarousel key={item.id} items={4} autoplay={true} dots={false} nav={false}>
                                      <img key={item.id} src={item.image?.[0][0]} alt="" /><img key={item.id} src={item.image?.[0][1]} alt="" /><img key={item.id} src={item.image?.[0][2]} alt="" /><img key={item.id} src={item.image?.[0][3]} alt="" />
                                    </OwlCarousel></div></div>
                                {/* <select className="ps-rating ps-shoe__rating">
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                      <option value="1">4</option>
                                      <option value="2">5</option>
                                    </select> */}
                              </div>
                              <div key={item.id} className="ps-shoe__detail" style={{textAlign:'left'}}>
                                <div key={item.id} style={{inlineSize: "15rem",  overflowWrap: "break-word"}}><a key={item.id} className="ps-shoe__name" onClick={() => handleDes(item.productId)}>{item.productName}</a></div>
                                <p key={item.id} className="ps-shoe__categories"><a key={item.id} href="#">
                                  {item.gender} shoes</a>,<a key={item.id} href="#"> Nike</a>,<a key={item.id} href="#"> Jordan</a></p><span key={item.id} className="ps-shoe__price">
                                  <del key={item.id}>₹{item.original_price}</del> ₹{item.selling_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}      
                    {products.map((item) => {
                      if(item.category==="shoes" && (genderFilter==='shoes' || genderFilter==='all'))
                      return(
                      <div className="grid-item shoes"key = {item.productId}>
                        <div className="grid-item__content-wrapper"key = {item.productId}>
                          <div className="ps-shoe mb-30" key = {item.productId}>
                            <div className="ps-shoe_thumbnail" key = {item.productId}><a key = {item.productId} className="ps-shoefavorite" href="#"><i key= {item.productId} className="ps-icon-heart"></i></a><img key = {item.productId} src={item.image?.[0]} alt="" /><a key= {item.productId} className="ps-shoe_overlay"  onClick={() => handleDes(item.id)}></a>
                            </div>
                            <div key = {item.productId} className="ps-shoe__content">
                              <div key = {item.productId} className="ps-shoe__variants">
                              <div key= {item.productId} className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                <div key = {item.productId} className='owl-stage-outer'>
                                  <OwlCarousel key={item.productId} items={4} autoplay={true} dots={false} nav={false}>
                                    <img key = {item.productId} src={item.image?.[0][0]} alt="" /><img key = {item.productId} src={item.image?.[0][1]} alt="" /><img key = {item.productId} src={item.image?.[0][2]} alt="" /><img key = {item.productId} src={item.image?.[0][3]} alt="" />
                                  </OwlCarousel></div></div>
                              </div>
                              <div key = {item.productId} className="ps-shoe__detail" style={{textAlign:'left'}}>
                                <div key= {item.productId} style={{inlineSize: "15.0rem",  overflowWrap: "break-word"}}><a key = {item.productId} className="ps-shoe__name" href="#" >{item.name}</a></div>
                                {/* <p = {item.productId} className="ps-shoe__categories"><a = {item.productId} href="#">
                                  {item.gender} shoes</a>,<a = {item.productId} href="#"> Nike</a>,<a = {item.productId} href="#"> Jordan</a></p> */}
                                  <span key= {item.productId} className="ps-shoe__price">
                                  <del key = {item.productId}>₹{item.original_price}</del> ₹{item.final_price}</span>
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
          <br></br> <br></br> <br></br>

          <div className="ps-home-testimonial bg--parallax pb-80" data-background={prod?.[1].images?.[0]} style={{display:'block',minHeight:'10.0rem',maxHeight:'55.0rem', background: `url(${prod?.[1].images?.[0]})` }}>

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
                  <footer id="ohk"> 
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
          <div className="ps-features pt-80 pb-80">
            <div className="ps-container">
              <div className="row" style={{display:'flex',justifyContent:'center'}}>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 " style={{display:'flex',justifyContent:'center'}}>
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
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 " style={{display:'flex',justifyContent:'center'}}>
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
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 " style={{display:'flex',justifyContent:'center'}}>
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
          <div className="ps-section ps-home-blog pt-80 pb-80" >
            <div className="ps-container">
              <div className="ps-section__header mb-50" ref={socialSection}>
                <h2 className="ps-section__title" data-mask="Social">- Connect With Us</h2>
                {/* <div className="ps-section__action"><a className="ps-morelink text-uppercase" href="#">View all post<i className="fa fa-long-arrow-right"></i></a></div> */}
              </div>
              <div className="ps-section__content">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                   
                     <div className="ps-post_thumbnail"><a className="ps-post_overlay" href="blog-detail.html"></a>
                      {/* <InstagramEmbed url={link1||'https://www.instagram.com/p/CdnAqLmPLH6/'} /> */}
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      {/* <div className="ps-post_thumbnail"><a className="ps-post_overlay" href="blog-detail.html"></a><InstagramEmbed url={link2||"https://www.instagram.com/p/CZwUxp2Pn-x/"} /></div> */}
                      
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      {/* <div className="ps-post_thumbnail"><a className="ps-post_overlay" href="blog-detail.html"></a><InstagramEmbed url={link3||"https://www.instagram.com/p/Cbw6aAUv1GW/"} /></div> */}
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-home-partner">
            <div className="ps-container">
              <div className="owl-slider" id="slider1" data-owl-auto="true" data-owl-loop="true" data-owl-speed="5000" data-owl-gap="40" data-owl-nav="false" data-owl-dots="false" data-owl-item="6" data-owl-item-xs="2" data-owl-item-sm="4" data-owl-item-md="5" data-owl-item-lg="6" data-owl-duration="1000" data-owl-mousedrag="on">

                <OwlCarousel items={6} autoplay={true} dots={false} margin={40} nav={false}  responsive={{
            '0': {
                items: 3,
            },
            '450': {
                items: 4,
            },
            '600': {
                items: 5,
            },
            '1000': {
                items: 7,
            },
        }}>

                  <a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/1.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/2.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/3.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/4.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/5.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/6.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/7.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/8.png" alt="" /></a>
                </OwlCarousel>
              </div>
            </div>
          </div>
          <div className="ps-home-contact" ref={aboutSection}>
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
          {/* <Contact/> */}
          
   
          <Footer />
        </main>
      </body>
      
    </React.Fragment>
  );
}



export default Homepage;