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
import EdiText from 'react-editext';





const BackendServer = process.env.REACT_APP_BACKEND_SERVER;










function EditableTextField({ value }) {
  const [textValue, setTextValue] = useState(value);
  const [editing, setEditing] = useState(true);

  const handleSave = (val) => {
    setTextValue(val);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <EdiText
          type="text"
          value={textValue}
          onSave={handleSave}
        />
      ) : (
        <div onClick={() => setEditing(true)}>
          {textValue}
        </div>
      )}
    </div>
  );
}












const Checkbox = ({ label, checked, onChange }) => { 

  return (
    <div className="checkbox-wrapper" style={{border:'none'}}>
      <label>
        <input
          value={label}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={checked ? "checked" : ""}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};











const OrderDetail=()=> {
  const [searchParams,] = useSearchParams({});
      // console.log(orderId);
    const [order, setOrder] = useState({});
    const [editingAddress, setEditingAddress] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [comment, setComment] = useState("");
    const [product, setProduct] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [daysDiff, setdaysDiff] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [exchangeType, setExchangeType] = useState('');
    const [selectedOptionExchange, setSelectedOptionExchange] = useState();
    const [reasonForExchange, setReasonForExchange] = useState('');
    const [pickupAddress, setPickupAddress] = useState('');
    const [progressBarStages, setProgressBarStages] = useState([
      { name: 'Placed', active: true},
      { name: 'Shipped', active: order.status === "Order Shipped" ||
      order.status === "Order Delivered" },
      { name: 'Delivered', active: order.status === "Order Delivered" },
    ]);
    const [returnRequested, setReturnRequested] = useState();
    const [exchangeRequested, setExchangenRequested] = useState();
    const [productId, setProductId] = useState();



    console.log(refresh);

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
          setExchangenRequested(response.data?.exchange);
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
      
    }, [order,refresh]);




    useEffect(() => {
      // console.log();
      // setProductId(searchParams.get('productId'));
      axios.get(`${BackendServer}getAvailableSizes?skuId=${searchParams.get('productId')}`)
      .then((response) => {
        // console.log(response.data.sizes);
        setSizes(response.data.sizes);
      });
      
    }, [show1]);

    const showToastMessage = () => {
      toast.success('Return Initiated !', {
          position: toast.POSITION.TOP_RIGHT
      });
  };


  const handleCancel = () => {
    setShowModal(true);
  };

  const handleEditClick = () => {
    setEditingAddress(true);
  };

  const handleSaveAddress = (val) => {
    setEditingAddress(false);
    console.log(val,'val');
    setPickupAddress(val);
    // order.address=val;
    // Update order.address here
  };
  const handleConfirm = () => {
    console.log('order',order);
    
    // handle cancel order here
    axios.post(`${BackendServer}postOrderCancel`,{order})
          .then((response) => {
            console.log(response.data);
            order.status="Order Canceled";
            
          });
    setShowModal(false);
    setRefresh(!refresh);
  };


  const reason=['Size or fit issue','Recieved wrong or defected product'];


    // const handleCancel=()=>{
    //   window.confirm('Are you sure you wish to delete this item?');
    //   console.log('cancel');
    // }

    const handleClick = (index) => {
      if(activeIndex===index){
        setActiveIndex(null);
      }
      else{
        setActiveIndex(index);
      }
    };


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


  
    const handleClose1 = () => {
      setShow1(false);
    };
  
    function handleChangeExchange(item) {
      setSelectedOptionExchange(item);
    }
  
    const handlePickupAddressChange = (event) => {
      setPickupAddress(event.target.value);
    };
  
    const handleSubmitexchange = (event) => {
      event.preventDefault();
      if(activeIndex!==null && selectedOptionExchange){
        console.log('Exchange type:', sizes[activeIndex]);
        console.log('Reason for exchange:', selectedOptionExchange);
        console.log('Pickup address:', pickupAddress || order.address);

        axios.post(`${BackendServer}postOrderExchange`,{exchange_size:sizes[activeIndex],exchange_reason:selectedOptionExchange,exchange_pickup_address:pickupAddress || order.address,order})
          .then((response) => {
            
          });

          toast.success('Exchange initiated!');
          setRefresh(!refresh);
          setShow1(false)

      }
      else{
        toast.error('Please fill out all required fields!');

      }
      
    };
  

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
  const handleExchange=()=>{
    setShow1(true)

    
  }

    console.log(returnRequested,exchangeRequested,order);


  return (
    <>

<Modal show={showModal}  style={{opacity:1}} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to cancel this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>







      <Modal
        show={show1}
        // size={'lg'}
        dialogClassName="modal-width"
        style={{opacity:1}}
        scrollable={true}

        
        keyboard={true}
      >
      <form onSubmit={handleSubmitexchange}>

      
      
        <Modal.Body className="exchanngemodalwindow">
            <div className="exchangewindow" >
              <div className="selectsize">
                <h3>Select Replacement Size</h3>
                <span>Original Size: {productId?.split('/')[2]}</span>
                <hr className="hrexchange"></hr>
                {sizes.map((item,index)=>{
                  return(
                    <>
                    <div
                  className={`numberCircle ${activeIndex === index ? "active" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {item}
                </div>
                    </>
                  )
                })}
                
              </div>
              <div className="selectreason">
                <h3>Why are you exchanging?</h3>
                <span>Please choose the correct reason for return. This •nformaton is only used to improve our service.</span>
                <hr className="hrexchange"></hr>
                <div className="radioselectexchange">
                {reason.map((item,index)=>{
                      return(
                         <>
                         <Checkbox label={item} name={item} checked={selectedOptionExchange===item} onChange={() => handleChangeExchange(item)} />
                    
                    </> 
                      )
                      
                    })}
                </div>

              </div>
              <div className="selectpickupexchange">
                <h3 style={{ paddingBottom: '1.5rem' }}>Pickup Address</h3>
                {editingAddress ? (
                  <EdiText
                    style={{ display: 'block', marginBottom: '2rem' }}
                    value={pickupAddress || order.address}
                    onSave={handleSaveAddress}
                    onCancel={()=>setEditingAddress(false)}
                  />
                ) : (
                  <span style={{ display: 'block',position:'relative',top:'1rem', marginBottom: '2rem' }}>
                    {pickupAddress || order.address}
                  </span>
                )}
                <h3
                  className="d-1 h3tag"
                  onClick={handleEditClick}
                >
                  {'CHANGE PICKUP ADDRESS'}
                </h3>
              </div>
            </div>

            
        
          
        </Modal.Body>

        <Modal.Footer style={{position: 'absolute',bottom: '0',width: '100%'}}>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Submit
          </Button>
          
        </Modal.Footer>
        </form>
        
        
      </Modal>







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
            

            
            <div className="row" style={{display: 'flex'}}>
            <div className="col" style={{flex: '50%',padding: '0.5em'}}>
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
            

            <div className="col" style={{flex: '50%',padding: '0.5em'}}>
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
                  <MDBCardImage
                    fluid
                    className="align-self-center"
                    src={order?.items?.image}
                    width="250"
                    style={{display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      }}
                  />
                  <MDBTypography tag="h5" className="bold" style={{display: 'block',
                      textAlign:'center'
                      }}>
                        {order.productName}
                      </MDBTypography>
                      <p className="ptag text-muted" style={{textAlign:'center'}}> Qt: {order.items?order.items.quantity:''} item</p>


                      <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                      {order.status==="Order Canceled" ? (
                      <>
                        <div class="ItemDetails-cancelledCard"><div class="CancelledCard-test"><div class="CancelledCard-Container"><div class="CancelledCard-IconContainer"><div class="CancelledCard-CloseIcon"><span class="svgImages-svg svgImages-crossBox " style={{height: "24px",width: "24px"}}></span></div></div><div class="CancelledCard-TextContainer"><div class="CancelledCard-Text">Cancelled On {new Date(order.updatedAt).toDateString()}</div><div class="CancelledCard-TextSecondary"> as per your request</div></div></div></div></div>
                      </>
                    ):(
                      <>
                      </>
                    )}
                    {returnRequested && order.statys!=="Order Canceled" ? (
                      <>
                        <li className={`litag step0 ${order.status === "Return Initialized" || order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted" }`} id="step1">
                      <span className="span0">Initialized</span>
                    </li>
                    <li className={`litag step0 ${order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted"} text-center`} id="step2">
                      <span>Pickup</span>
                    </li>
                    <li className={`litag step0 ${ order.status === "Order Delivered"? "active" : "text-muted"} text-end`} id="step3">
                      <span className="span2">Returned</span>
                    </li>
                      </>
                    ):(
                      <>
                      </>
                    )}
                     {exchangeRequested && order.statys!=="Order Canceled" ? (
                      <>
                        <li className={`litag step0 ${order.status === "Exchange Initialized" || order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted" }`} id="step1">
                      <span className="span0">Initialized</span>
                    </li>
                    <li className={`litag step0 ${order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted"} text-center`} id="step2">
                      <span>Pickup</span>
                    </li>
                    <li className={`litag step0 ${ order.status === "Order Delivered"? "active" : "text-muted"} text-end`} id="step3">
                      <span className="span2">Exchanged</span>
                    </li>
                      </>
                    ):(
                      <>
                      </>
                    )}
                    {!returnRequested && order.status!=="Order Canceled" && !exchangeRequested ? (
                      <>
                        <li className={`litag step0 ${order.status === "Order Placed" || order.status === "Order Shipped" ||  order.status === "Order Delivered"? "active": "text-muted" }`} id="step1">
                      <span className="span0">Placed</span>
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
                      </>
                    )}
                  </ul>
                  <div >
                  

                      {order.status === "Order Delivered" ? (
                        <>
                        <MDBTypography tag="h5"  style={{padding: '10px',border: '2px solid #d2d2d2',display: 'inline-block',width:'100%'
                      
                    }}>
                     • Exchange/Return window {daysDiff<7?`open for ${7-daysDiff} days`:'closed'} 
                    </MDBTypography>
                      <MDBTypography
                        tag="h5"
                        style={{
                          padding: "10px",
                          border: "2px solid #d2d2d2",
                          display: "inline-block",
                          width: "100%",
                        }}
                      >
                        • The order was delivered on {new Date(order.updatedAt).toDateString()}
                      </MDBTypography>
                      </>
                    ) : null}

                      
                  </div>
                  
                  <div style={{borderTop:'1px solid',borderBottom:'1px solid',paddingBottom:'3rem',marginTop:'3rem'}}>
                    <MDBTypography tag="h3" style={{marginTop:'3rem'}}>
                     { exchangeRequested?"Pickup Address":"Delivery Address" }
                    </MDBTypography>
                    <div className="Address-nameNumber">
                      <MDBTypography tag="h5" style={{marginRight:'1rem',marginTop:'0rem'}}>
                        {order.name_reciever}
                      </MDBTypography>
                      <div class="Address-verticalDivider"></div>
                      <MDBTypography tag="h5" style={{marginLeft:'1rem',marginTop:'0rem'}}>
                        {order.mobile_reciever}
                      </MDBTypography>


                    </div>
                    <span class="Text-Text" style={{paddingTop: "6px",lineHeight:'1.5',color: "rgb(105, 110, 121)"}}>{order?.exchange_details?.exchange_pickup_address || order.address}</span>

                  </div>


                  <div style={{paddingBottom:'3rem',marginTop:'3rem'}}>
                    {/* <MDBTypography tag="h3" style={{marginTop:'3rem'}}>
                      Total Order Price 
                    </MDBTypography> */}
                    <div class="PriceDetails-itemPrice">
                      <p>
                        <MDBTypography tag="h3" style={{marginTop:'3rem'}}>
                          Total Order Price 
                        </MDBTypography>
                      </p>
                      <p>
                        <MDBTypography tag="h3" style={{marginTop:'3rem'}}>
                        ₹ {order?.total?order?.total.toFixed(2):''}
                        </MDBTypography>
                      </p>
                      </div>
                      <div class="PriceDetails-discount"><span>You saved </span><span class="Text-Text" style={{fontFamily: "Assistant", fontWeight: "600", color: "rgb(3, 166, 133)"}}>₹{product?.original_price-product?.selling_price-order?.coupon?.value}</span><span> on this order</span></div>
                      <div class="Styles-buttonHolder" style={{display: 'flex',
                      marginTop:'3.5rem',
                      justifyContent:'center'
                      }}><button class="
                        visionbutton-button
                        visionbutton-l
                        visionbutton-secondary
                        undefined
                        
                      ">Get Invoice</button></div>
                  </div>

                      
                  {/* <div className="divtag d-flex flex-row mb-4 pb-2 " >
                    
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
                  </div> */}
                  {/* <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
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
                  </ul> */}
                </MDBCardBody>
                <MDBCardFooter className="p-4">
                <div className="divtag d-flex">
                  
                  {order.status === 'Order Delivered' && daysDiff<7 ? (
                    <>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                      <a className="atag" href="#!" onClick={handleExchange}>Exchange</a>
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
                    {order.status==="Order Placed"?(
                      <>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                      <a href="#!" className="atag"  onClick={handleCancel}>  
                        Cancel
                      </a>
                      </MDBTypography>
                      </>
                    ):(<></>)}
                      
                    
                  
                  <div className="divtag border-start h-100"></div>
                    </>
                  )}

                    {/* <MDBTypography tag="h5" className="fw-normal mb-0">
                      <a href="#!" className="atag text-muted">
                        <BiDotsVerticalRounded fas icon="ellipsis-v" />
                      </a>
                    </MDBTypography> */}
                  
                  
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
