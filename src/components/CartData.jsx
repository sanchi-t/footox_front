
import axios from "axios";
import  {useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/DataReducer/action";
import { useLocation,useNavigate } from "react-router-dom";




const CartData=()=>{
    // console.log('here at cart details');
  const [items, setItems] = useState([{}]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  sessionStorage.setItem('coupon', discount);

  const [cartData, setCartData] = useState();
  const products = useSelector((store) => store.dataReducer.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const userData=JSON.parse(localStorage.getItem('all'));

  const navigate = useNavigate();

  
  


  let num = useState({});

    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
  useEffect(() => {
    console.log('inside useState')
    // dispatch(getData());
    
    axios.get('http://localhost:4000/checkout', {params:
    userData
  }).then((response) => {
            const cur =[];
            const quant=[];
            let sum=0;
            // console.log(response);
            const all=response.data.cart.cart;
            localStorage.setItem('cart',JSON.stringify(all));
            
            all.forEach((number, index) => {
              cur.push(products.find((item) => item.productId === (number.id.split('/')[0])));
              quant.push(number.quantity);
              sum=sum+(number.quantity*Number(cur[index]?.selling_price));
              number.price=number.quantity*Number(cur[index]?.selling_price);
              
            //   console.log('Index: ' + index + ' Value: ' + number.id);
              setItems([...cur]);
              setQuantity([...quant]);
              setTotal(sum);
          });
        //   localStorage.setItem('cart',JSON.stringify(all));
        //   consol
          
          
          
          });
          
    
  }, [cartData,typeof items[0]])
//   console.log(items,'yoyo',total);
  sessionStorage.setItem('items', JSON.stringify(items));
  sessionStorage.setItem('quantity', JSON.stringify(quantity));
  sessionStorage.setItem('total', total);


  


  
  



 



  


}





export default CartData;