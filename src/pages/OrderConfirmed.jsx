
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




const OrderCorfirmed =()=>{
    const navigate = useNavigate();

  
    useEffect(() => {
        console.log('i fire once');
        axios.post('http://localhost:4000/orderConfirmed', {order:JSON.parse(sessionStorage.getItem('order'))})
          .then((response) => {
            console.log(response);
          });
        
      }, []);
  

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


    return(
        <body className="ps-loading">
            {/* <Header/> */}
        <div className="ps-404 bg--cover" data-background="" style={{height:'800px'}}>
          <div className="ps-404__content">
            <h3 style={{color:'black'}}>Order Confirmed</h3>
            <button onClick={handleClick}>hi</button>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p><a className="ps-btn" onClick={handleDes}>Back to home<i className="ps-icon-next"></i></a>
          </div>
        </div>
        <main className="ps-main">
        </main>
        {/* <Footer/> */}
      </body>
    )
}


export default OrderCorfirmed;