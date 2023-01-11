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
    window.location.reload();
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
  }, [products])
  console.log('kuhoo', prod)
  useEffect(() => {
    dispatch(getData(queryParams));
  }, [])
  console.log('helloo', products, products1)

  return (
    <React.Fragment>
      <body className="ps-loading">
        <main className="ps-main">
          <div className="ps-banner">
            <div className="rev_slider fullscreenbanner" id="home-banner">
              <ul className="ps-banner">
                <li data-index="rs-29723" data-transition="random" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-easein="default" data-easeout="default" data-masterspeed="default" data-rotate="0" data-saveperformance="off"><img className="rev-slidebg" src={prod?.[0]?.images?.[0]} alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" data-no-retina />
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
                <li class="ps-banner ps-banner--white" data-index="rs-100" data-transition="random" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-rotate="0"><img class="rev-slidebg" src={prod?.[0]?.images?.[1]} alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" data-no-retina />
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
                  <div className="ps-masonry1">
                    <div className="grid-sizer"></div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper" ><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images?.[0]} alt="" /></a></div>
                    </div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images?.[1]} alt="" /></a></div>
                    </div>
                    <div className="grid-item high" style={{float:'right'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images?.[4]} alt="" /></a></div>
                    </div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images?.[2]} alt="" /></a></div>
                    </div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2].images?.[3]} alt="" /></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         

          <div className="ps-home-testimonial bg--parallax pb-80" data-background={prod?.[1].images?.[0]} style={{display:'block',minHeight:'100px',maxHeight:'550px', background: `url(${prod?.[1].images?.[0]})` }}>

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
          
          
          

        </main>
      </body>
    </React.Fragment>
  );
}



export default Homepage;