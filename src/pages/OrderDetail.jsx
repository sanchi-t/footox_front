import React,{useState} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import moment from 'moment';
import { useEffect } from "react";
import {Modal,Button} from 'react-bootstrap';
import axios from "axios";
import '../components/Modal.css'
import {BiDotsVerticalRounded} from "react-icons/bi"; 
import { useLocation, useSearchParams,createSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./OrderDetail.css";
import { setProductData } from "../redux/DataReducer/action";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const BackendServer = process.env.REACT_APP_BACKEND_SERVER;






const OrderDetail=()=> {
  const [searchParams,] = useSearchParams({});
      // console.log(orderId);
    const [order, setOrder] = useState({});
    const [selectedOption, setSelectedOption] = useState("");
    const [comment, setComment] = useState("");
    const [product, setProduct] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [show, setShow] = useState(false);
    const [daysDiff, setdaysDiff] = useState(0);
    const [progressBarStages, setProgressBarStages] = useState([
      { name: 'Placed', active: true},
      { name: 'Shipped', active: order.status === "Order Shipped" ||
      order.status === "Order Delivered" },
      { name: 'Delivered', active: order.status === "Order Delivered" },
    ]);
    const [returnRequested, setReturnRequested] = useState();
    const [productId, setProductId] = useState();


    // console.log(order.status === "Order Placed" || order.status === "Order Shipped" ||  order.status === "Order Delivered",progressBarStages[0].active)
    useEffect(() => {
      // console.log();
      setProductId(searchParams.get('productId'));
      axios.get(`${BackendServer}getOrderUser?_id=${searchParams.get('orderId')}`)
        .then((response) => {
          
          const date1 = moment(response.data.updatedAt);
          const date2 = moment();
          const diffInDays = date2.diff(date1, 'days');
          setdaysDiff(diffInDays)
          console.log(diffInDays);


          setOrder(response.data);
          setReturnRequested(response.data.return)
        });
      axios.get(`${BackendServer}oneproduct?productId=${searchParams.get('productId').split('/')[0]}`)
      .then((response) => {
        setProduct(response.data.products);
      });
    }, [returnRequested,refresh]);

  


    useEffect(() => {
      // console.log();
      // setProductId(searchParams.get('productId'));
      setProgressBarStages([
        { name: 'Placed', active: order.status === "Order Placed" || order.status === "Order Shipped" ||  order.status === "Order Delivered" },
        { name: 'Shipped', active: order.status === "Order Shipped" ||
        order.status === "Order Delivered" },
        { name: 'Delivered', active: order.status === "Order Delivered" },
      ])
      
    }, [order]);

    const showToastMessage = () => {
      toast.success('Return Initiated !', {
          position: toast.POSITION.TOP_RIGHT
      });
  };


    const handleCancel=()=>{
      
      console.log('cancel');
    }


    const handleClose=()=>{
      setShow(false)
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(selectedOption,comment);
      if(selectedOption){
        setReturnRequested(true);
        setRefresh(!refresh);
        setShow(!show);
        setComment('');
        setSelectedOption('');
        axios.post(`${BackendServer}postOrderReturn`,{order,selectedOption,comment})
          .then((response) => {
            console.log(response.data);
            
          });
        showToastMessage();
      }
      else{
        toast.error('No option Selected!');
      }
      
      
    }

    const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
  };


  const handleCommentChange = (changeEvent) => {
    setComment(changeEvent.target.value);
  };

    const handleReturn=()=>{
      console.log('return');
      setShow(true)

      
    }


  return (
    <>

      <Modal
        show={show}
        // size={'lg'}
        dialogClassName="modal-width"
        style={{opacity:1}}
        

        
        keyboard={true}
      >
      <form style={{paddingLeft:'6rem',paddingRight:'6rem'}} onSubmit={handleSubmit}>

      
      <Modal.Header closeButton>
          <Modal.Title>Order Return</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            

            
            <div class="row" style={{display: 'flex'}}>
            <div class="col" style={{flex: '50%',padding: '0.5em'}}>
              <label>Reason for Return:</label>
            <div>
              <input type="radio" id="wrongItem" name="reason" value="Wrong Item" checked={selectedOption === "Wrong Item"} onChange={handleOptionChange} />
              <label htmlFor="wrongItem">Wrong Item</label>
            </div>

            <div>
              <input type="radio" id="damagedItem" name="reason" value="Damaged Item" checked={selectedOption === "Damaged Item"} onChange={handleOptionChange} />
              <label htmlFor="damagedItem">Damaged Item</label>
            </div>

            <div>
              <input type="radio" id="defectiveItem" name="reason" value="Defective Item" checked={selectedOption === "Defective Item"} onChange={handleOptionChange} />
              <label htmlFor="defectiveItem">Defective Item</label>
            </div>

            <div>
              <input type="radio" id="otherReason" name="reason" value="Other Reason" checked={selectedOption === "Other Reason"} onChange={handleOptionChange} />
              <label htmlFor="otherReason">Other Reason</label>
            </div>
            </div>
            

            <div class="col" style={{flex: '50%',padding: '0.5em'}}>
            <label style={{display:'block'}} htmlFor="comments">Comments:</label>
            <textarea style={{display:'block'}} id="comments" onChange={handleCommentChange} name="comments"></textarea>
            </div>
            </div>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Submit
          </Button>
          
        </Modal.Footer>
        </form>
        
        
      </Modal>
      <ToastContainer />


    <Header/>
      <section className="vh-100 gradient-custom-2">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="rowtag justify-content-center align-items-center h-100">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard
                className="card-stepper"
                style={{ borderRadius: "16px" }}
              >
                <MDBCardHeader className="p-4">
                  <div className="divtag d-flex justify-content-between align-items-center">
                    <div className="divtag">
                      <p className="ptag text-muted mb-2">
                        {" "}
                        Order ID{" "}
                        <span className="fw-bold text-body">{order._id}</span>
                      </p>
                      <p className="ptag text-muted mb-0">
                        {" "}
                        Place On{" "}
                        <span className="fw-bold text-body">
                          {new Date(order.createdAt).toDateString()}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="divtag">
                      <MDBTypography tag="h6" className="mb-0">
                        {" "}
                        <a className="atag" href="#">View Details</a>{" "}
                      </MDBTypography>
                    </div>
                  </div>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="divtag d-flex flex-row mb-4 pb-2">
                    <div className="divtag flex-fill">
                      <MDBTypography tag="h5" className="bold">
                        {product.productName}
                      </MDBTypography>
                      <p className="ptag text-muted"> Qt: {order.items?order.items.find(item => item.id === productId).quantity:''} item</p>
                      <MDBTypography tag="h4" className="mb-3">
                        {" "}
                        ₹{order.items?order.items.find(item => item.id === productId).price:''}{" "}
                        <span className="small text-muted"> via (COD) </span>
                      </MDBTypography>
                      <p className="ptag text-muted">
                        Tracking Status on:{" "}
                        <span className="text-body">11:30pm, Today</span>
                      </p>
                    </div>
                    <div className="divtag">
                      <MDBCardImage
                        fluid
                        className="align-self-center"
                        src={product?.image?.[product?.color.indexOf((productId).split('/')[1])]?.[0]}
                        width="250"
                      />
                    </div>
                  </div>
                  <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                    {returnRequested ? (
                      <>
                        <li className={`litag step0 ${order.status === "Return Initialized" || order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted" }`} id="step1">
                      <span className="span0">Initialized</span>
                    </li>
                    <li className={`litag step0 ${order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted"} text-center`} id="step2">
                      <span>{progressBarStages[1].name}</span>
                    </li>
                    <li className={`litag step0 ${ order.status === "Order Delivered"? "active" : "text-muted"} text-end`} id="step3">
                      <span className="span2">{progressBarStages[2].name}</span>
                    </li>
                      </>
                    ):(
                      <>
                      <li className={`litag step0 ${order.status === "Order Placed" || order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted" }`} id="step1">
                      <span className="span0">{progressBarStages[0].name}</span>
                    </li>
                    <li className={`litag step0 ${order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted"} text-center`} id="step2">
                      <span>{progressBarStages[1].name}</span>
                    </li>
                    <li className={`litag step0 ${order.status === "Order Delivered"? "active" : "text-muted"} text-end`} id="step3">
                      <span className="span2">{progressBarStages[2].name}</span>
                    </li>
                      </>
                    )}
                  </ul>
                </MDBCardBody>
                <MDBCardFooter className="p-4">
                <div className="divtag d-flex">
                  
                  {order.status === 'Order Delivered' && daysDiff<7 ? (
                    <>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                      <a className="atag" href="#!">Track</a>
                    </MDBTypography>
                    <div className="divtag border-start h-100"></div>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                        <a href="#!" className="atag" onClick={handleReturn}>
                          Return
                        </a>
                      </MDBTypography>
                      <div className="divtag border-start h-100"></div>
                    </>
                  ) : (
                    <>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                    <a className="atag" href="#!">Track</a>
                    </MDBTypography>
                    <div className="divtag border-start h-100"></div>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                    <a href="#!" className="atag" onClick={showToastMessage}>
                      Cancel
                    </a>
                  </MDBTypography>
                  <div className="divtag border-start h-100"></div>
                    </>
                  )}

                    <MDBTypography tag="h5" className="fw-normal mb-0">
                      <a href="#!" className="atag text-muted">
                        <BiDotsVerticalRounded fas icon="ellipsis-v" />
                      </a>
                    </MDBTypography>
                  
                  
                </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer/>
    </>
  );
}


export default OrderDetail;
