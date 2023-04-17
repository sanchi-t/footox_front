import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Slider.scss";
import axios from "axios";
const BackendServer = process.env.REACT_APP_API_BASE_URL;


const Slider = () => {
    const [prod, setProd] = useState([]);
    const [slide, setSlide] = useState([]);


  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}banner`)
      setProd(response.data)
      setSlide(response.data[0].images)
    }
    const l = axiosTest()
  }, [slide.length])

  // console.log(slide);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = slide.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 10000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);
  if(slide){

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {slide.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide} alt="slide" className="image" />
                <div className="content">
                  <h2 className="ps-banner__title">RECOVERY</h2>
                  <p>Supa wanted something that was going to rep his East Coast <br /> roots and, more specifically, his hometown of  New York City in a big way. </p>
                  <hr />
                  <button className="tp-caption ps-btn">Purchase Now<i className="ps-icon-next"></i></button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
    }
};

export default Slider;