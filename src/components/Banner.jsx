import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData, getBannerData } from "../redux/DataReducer/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RevSlider, { Slide, Caption } from 'react-rev-slider';
import './Banner.css';

const BackendServer = process.env.REACT_APP_BACKEND_SERVER;


const Banner = () => {
  const config = {
    startwidth:1170,
    startheight:500,
    fullWidth:"on",
    fullHeight:"on",
    forceFullWidth:"on"
};
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
  const [prod, setProd] = useState([]);
  const [slide, setSlide] = useState([]);


  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}banner`)
      setProd(response.data)
      setSlide(response.data[0].images)
    }
    const l = axiosTest()
  }, [products])
  console.log('kuhoo', prod)
  useEffect(() => {
    dispatch(getData(queryParams));
  }, [])
  console.log('helloo', products, products1)
  if(prod){

  

  return (
    <React.Fragment>
      {/* <RevSlider config={config} >
          <Slide
        src={slide[0]}
        data-bgposition="center center"
        data-bgfit="cover"
        data-bgrepeat="no-repeat"
        data-bgparallax="5"
        data-no-retina
        alt="slidebg1"
        slideProperties={{
          'data-index':"rs-29723",
          'data-transition': "random",
          'data-slotamount':"default",
          'data-hideafterloop':"0",
          'data-hideslideonmobile':"off",
          'data-easein':"default",
          'data-easeout':"default",
          'data-masterspeed':"default",
          'data-rotate':"0",
          'data-saveperformance':"off"
        }}>
          

          
        
           
    </Slide>

       
    
    <Slide
        src={prod?.[0]?.images?.[1]}
        data-bgposition="center center"
        data-bgfit="cover"
        data-bgrepeat="no-repeat"
        data-bgparallax="5"
        data-no-retina
        alt="slidebg1"
        slideProperties={{
            'data-index':"rs-29723",
            'data-transition': "random",
            'data-slotamount':"default",
            'data-hideafterloop':"0",
            'data-hideslideonmobile':"off",
            'data-easein':"default",
            'data-easeout':"default",
            'data-masterspeed':"default",
            'data-rotate':"0",
            'data-saveperformance':"off"
        }}
    >
    <div className="rev_slider fullscreenbanner" id="home-banner">
              <ul className="ps-banner">
      <div className="tp-caption ps-banner__header" id="layer20" data-x="left" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-150','-120','-150','-170']" data-width="['none','none','none','400']" data-type="text" data-responsive_offset="on" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>BEST ITEM <br /> THIS SUMMER</p>
                  </div>
                  <div className="tp-caption ps-banner__title" id="layer339" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-60','-40','-50','-70']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p className="text-uppercase">Recovery</p>
                  </div>
                  <div className="tp-caption ps-banner__description" id="layer2-14" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['30','50','50','50']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>Supa wanted something that was going to rep his East Coast <br /> roots and, more specifically, his hometown of  New York City in  a big way.</p>
                  </div><a className="tp-caption ps-btn" id="layer364" href="#" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['120','140','200','200']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">Purchase Now<i className="ps-icon-next"></i></a>
                  </ul>
                  </div>
    </Slide>
</RevSlider> */}
    
    <div className="ps-banner">
            <div className="rev_slider fullscreenbanner" id="home-banner">
              <ul className="ps-banner">
                <li data-index="rs-29723" data-transition="random" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-easein="default" data-easeout="default" data-masterspeed="default" data-rotate="0" data-saveperformance="off"><img className="rev-slidebg" src={"https://storage.pixteller.com/designs/designs-images/2020-12-21/05/sport-shoes-sale-banner-1-5fe0c471dbecb.png"} alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" data-no-retina />
                  <div className="tp-caption ps-banner__header" id="layer4" data-x="left" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-150','-60','-70','-70']" data-width="['none','none','none','400']" data-type="text" data-responsive_offset="on" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>March 2017 <br /> BASKETBALL FASHION</p>
                  </div>
                  <div className="tp-caption ps-banner__title" id="layer24" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-60','0','0','0']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>CLOTHING</p>
                  </div>
                  <div className="tp-caption ps-banner__description" id="layer2-14" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['30','0','0','0']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>Supa wanted something that was going to rep his East Coast <br /> roots and, more specifically, his hometown of  New York City in a big way.</p>
                  </div><a className="tp-caption ps-btn" id="layer34" href="#" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['120','60','70','70']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">Purchase Now<i className="ps-icon-next"></i></a>
                </li>
                <li className="ps-banner ps-banner--white" data-index="rs-100" data-transition="random" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-rotate="0"><img className="rev-slidebg" src={"https://storage.pixteller.com/designs/designs-images/2020-12-21/05/sport-shoes-sale-banner-1-5fe0c471dbecb.png"} alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" data-no-retina />
                  <div className="tp-caption ps-banner__header" id="layer20" data-x="left" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-150','-120','-150','-170']" data-width="['none','none','none','400']" data-type="text" data-responsive_offset="on" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>BEST ITEM <br /> THIS SUMMER</p>
                  </div>
                  <div className="tp-caption ps-banner__title" id="layer339" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['-60','-40','-50','-70']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p className="text-uppercase">Recovery</p>
                  </div>
                  <div className="tp-caption ps-banner__description" id="layer2-14" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['30','50','50','50']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">
                    <p>Supa wanted something that was going to rep his East Coast <br /> roots and, more specifically, his hometown of  New York City in  a big way.</p>
                  </div><a className="tp-caption ps-btn" id="layer364" href="#" data-x="['left','left','left','left']" data-hoffset="['-60','15','15','15']" data-y="['middle','middle','middle','middle']" data-voffset="['120','140','200','200']" data-type="text" data-responsive_offset="on" data-textalign="['center','center','center','center']" data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;x:50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]">Purchase Now<i className="ps-icon-next"></i></a>
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
                      <div className="grid-item__content-wrapper" ><a className="ps-offer" href="product-detail.html"><img src={prod?.[2]?.images?.[0]} alt="" /></a></div>
                    </div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2]?.images?.[1]} alt="" /></a></div>
                    </div>
                    <div className="grid-item high" style={{float:'right'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2]?.images?.[4]} alt="" /></a></div>
                    </div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2]?.images?.[2]} alt="" /></a></div>
                    </div>
                    <div className="grid-item" style={{float:'left'}}>
                      <div className="grid-item__content-wrapper"><a className="ps-offer" href="product-detail.html"><img src={prod?.[2]?.images?.[3]} alt="" /></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </React.Fragment>
  );
}
}



export default Banner;