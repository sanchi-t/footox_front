import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const PaymentFailed=()=>{
    const navigate=useNavigate();
    const handleDes=()=>{
        navigate(`/checkout`);
        window.location.reload();
        window.scrollTo(0,0); 

    }
    return(
        <body className="ps-loading">

            <Header/>
        <div className="ps-404 bg--cover" data-background="images/fail.jpeg" style={{height:'570px'}}>
          <div className="ps-404__content" style={{top:'440px'}}>
            <h3 style={{color:'black'}}>Payment Failed</h3>
            <p>Due to some technical reasons the payment has failed you can click on the link below to retry payment.</p><a className="ps-btn"  onClick={handleDes}>Retry Payment<i className="ps-icon-next"></i></a>
          </div>
        </div>
        <main className="ps-main" style={{paddingTop:'50px',paddingBottom:'50px'}}>
        
        </main>
        <Footer/>
      </body>
    );
}



export default PaymentFailed;