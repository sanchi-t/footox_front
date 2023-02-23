import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import  {useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/DataReducer/action";
import { AiOutlineRight } from "react-icons/ai";
import { useLocation,useNavigate } from "react-router-dom";




const ViewCart=()=>{


  function getLocalStorageOrDefault(key, defaultValue) {
    const stored = localStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    // console.log(stored)
    return JSON.parse(stored);
  }


  const [cartData1, setCartData1] = useState(getLocalStorageOrDefault('cart', []));

  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  sessionStorage.setItem('coupon', discount);

  const [cartData, setCartData] = useState();
  const products = useSelector((store) => store.dataReducer.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const userData=JSON.parse(localStorage.getItem('all'));
  const [change,setChange]=useState(false);


  const navigate = useNavigate();

  
  
  const handleCheckout=()=>{
    navigate('/checkout');
    window.location.reload();
  }

  let num = useState({});

    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
  useEffect(() => {
    // dispatch(getData());
    
    axios.get('http://localhost:4000/checkout', {params:
    userData
  }).then((response) => {
            const cur =[];
            const quant=[];
            let sum=0;
            console.log(response);
            const all=response.data.cart.cart;
            localStorage.setItem('cart',JSON.stringify(all));
            
            all.forEach((number, index) => {
              cur.push(products.find((item) => item.productId === (number.id.split('/')[0])));
              quant.push(number.quantity);
              sum=sum+(number.quantity*Number(cur[index]?.selling_price));
              number.price=number.quantity*Number(cur[index]?.selling_price);
              
              console.log('Index: ' + index + ' Value: ' + number.id);
              setItems([...cur]);
              setQuantity([...quant]);
              setTotal(sum);
          });
          localStorage.setItem('cart',JSON.stringify(all));
          
          });
          
    
  }, [cartData,typeof items[0],change])
  console.log(items,'yoyo',products);

  useEffect(() => {
    sessionStorage.setItem('items', JSON.stringify(items));
    sessionStorage.setItem('quantity', JSON.stringify(quantity));
    sessionStorage.setItem('total', total);
  }, [dispatch, change,cartData]);
  
  const increaseQuantity=(name,index)=>{

    const skuId=JSON.parse(localStorage.getItem('cart'))[index].id
    console.log('increse',skuId,index);
    valueChange(skuId,quantity[index]+1)
  }


  const decreaseQuantity=(name,index)=>{
    const skuId=JSON.parse(localStorage.getItem('cart'))[index].id
    console.log(quantity[index],'decrease')
    if(quantity[index]>1){
      valueChange(skuId,quantity[index]-1)}
    }
    

  const deleteItem=(name,index)=>{
    const skuId=JSON.parse(localStorage.getItem('cart'))[index].id
    axios.delete('http://localhost:4000/checkout',{data:{
    email:userData.email,id:skuId}
  }).then((response) => {
    setCartData(skuId);
    setChange(!change);
    console.log(response)
  });
  }
  



  const valueChange=(id,quantity)=>{
    axios.put('http://localhost:4000/checkout', {
    email:userData.email,id:id,quantity:quantity
  }).then((response) => {
    setCartData(response);
    console.log(response)
  });}
  

  const handleCoupon=(event)=>{
    event.preventDefault();
    const code=event.target.coupon.value;
    console.log('code',code)
    const date= new Date();
    // console.log(date,'date');
    axios.get('http://localhost:4000/couponApplied', 
    {params:
      {'code':code,'products':items,'quantity':quantity,'date':date,'email':userData.email}
    }).then((response) => {
      sessionStorage.setItem('uuid', response.data.uuid);
      sessionStorage.setItem('code', code);
      setDiscount(response.data.discount);
      // sessionStorage.setItem('coupon', response.data.discount);

      console.log(response);
    }).catch((e) => {
      alert('invalid coupon');
      console.log(e);
      setDiscount(0);
    });
    // console.log(event.target.coupon.value);
  }
  if(products){

  
  return(
    <body className="loading">
      <Header change={change}/>
    <main className="ps-main">
      <div className="ps-content pt-80 pb-80">
        <div className="ps-container">
          <div className="ps-cart-listing">
            <table className="table ps-cart__table">
              <thead>
                <tr>
                  <th>All Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item,index)=>{
                  return(
                    <tr>
                  <td><a className="ps-product__preview" href="product-detail.html"><img className="mr-15" style={{height:'100px'}} src={item?.image?.length>1 ?  item?.image[item.color.indexOf((cartData1[index].id).split('/')[1])][0] : "images/product/cart-preview/1.jpg" } alt=""/> {item?.productName}</a></td>
                  <td>₹{item?.selling_price}</td>
                  <td>
                    <div className="form-group--number">
                      <button className="minus" onClick={() => decreaseQuantity(item,index)}><span>-</span></button>
                      <input className="form-control" type="text" value={quantity[index]}/>
                      <button className="plus" onClick={() => increaseQuantity(item,index)}><span >+</span></button>
                    </div>
                  </td>
                  <td>₹{item?.selling_price*quantity[index]}</td>
                  <td>
                    <div className="ps-remove" onClick={() => deleteItem(item,index)}></div>
                  </td>
                </tr>
                  )
                })}
                {/* <tr>
                  <td><a className="ps-product__preview" href="product-detail.html"><img className="mr-15" src="images/product/cart-preview/1.jpg" alt=""/> air jordan One mid</a></td>
                  <td>$150</td>
                  <td>
                    <div className="form-group--number">
                      <button className="minus"><span>-</span></button>
                      <input className="form-control" type="text" value="2"/>
                      <button className="plus"><span>+</span></button>
                    </div>
                  </td>
                  <td>$300</td>
                  <td>
                    <div className="ps-remove"></div>
                  </td>
                </tr> */}
                {/* <tr>
                  <td><a className="ps-product__preview" href="product-detail.html"><img className="mr-15" src="images/product/cart-preview/2.jpg" alt=""/> The Crusty Croissant</a></td>
                  <td>$150</td>
                  <td>
                    <div className="form-group--number">
                      <button className="minus"><span>-</span></button>
                      <input className="form-control" type="text" value="2"/>
                      <button className'="plus"><span>+</span></button>
                    </div>
                  </td>
                  <td>$300</td>
                  <td>
                    <div className'="ps-remove"></div>
                  </td>
                </tr>
                <tr>
                  <td><a className'="ps-product__preview" href="product-detail.html"><img className'="mr-15" src="images/product/cart-preview/3.jpg" alt=""/>The Rolling Pin</a></td>
                  <td>$150</td>
                  <td>
                    <div className'="form-group--number">
                      <button className'="minus"><span>-</span></button>
                      <input className'="form-control" type="text" value="2"/>
                      <button className'="plus"><span>+</span></button>
                    </div>
                  </td>
                  <td>$300</td>
                  <td>
                    <div className'="ps-remove"></div>
                  </td>
                </tr> */}
              </tbody>
            </table>
            <div className="ps-cart__actions">
              <div className="ps-cart__promotion">
                <form onSubmit={handleCoupon}>
                <div className="form-group">
                  
                  <div className="ps-form--icon" style={{cursor:'pointer'}} ><i><button type="submit" style={{background:'none',padding:'0px',border:'none'}}><AiOutlineRight/></button></i>
                    <input className="form-control" name="coupon" type="text" placeholder="Promo Code"/>
                  </div>
                </div>
                </form>
                <div className="form-group">
                  <button className="ps-btn ps-btn--gray">Continue Shopping</button>
                </div>
              </div>
              <div className="ps-cart__total">
                {discount?
                 <> <h3>Total Price: <span> <del>₹{total}</del><div style={{color:'green',position:'in-line'}}>₹{total-discount}</div></span></h3><a className="ps-btn" onClick={handleCheckout} style={{cursor:'pointer'}}>Process to checkout<i className="ps-icon-next"></i></a> </>: <> <h3>Total Price: <span>₹{total}</span></h3><a className="ps-btn" onClick={handleCheckout} >Process to checkout<i className="ps-icon-next"></i></a>
                 </>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
    </main>
    <Footer/>
    </body>
  );
}
}





export default ViewCart;