import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../redux/DataReducer/action";
import Header from "../components/Header";
import Footer from "../components/Footer";




const Checkout=()=>{
    const { id } = useParams();
    let navigate = useNavigate();
    const [prod, setProd] = useState();
    const [color, setColor]=useState([]);
    const [imgg, setImg]=useState([]);
    const [sizes, setSize]=useState([]);


    const products = useSelector((store) => store.dataReducer.products);
    const dispatch = useDispatch();
    

    const [currentProducts, setCurrentProducts] = useState({});

    let num = useState({});

    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
      useEffect(() => {
        if (id) {
          const cur = products.find((item) => item.productId === id);

          cur && setCurrentProducts(cur);
          cur && setColor(cur.color)
          cur && setImg(cur.image);
          cur && setSize(cur.Sizes);
          setProd(products)
        }
      }, [id, products,dispatch,num]);

      console.log(products,'cur2');
      console.log(currentProducts, products);
      let index = products.indexOf(currentProducts);
      if(products){

    return (

       <body className="ps-loading">
          <Header/>
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
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a className="ps-product__preview" href="product-detail.html"><img className="mr-15" src="images/product/cart-preview/1.jpg" alt="" /> air jordan One mid</a></td>
                        <td>$150</td>
                        <td>
                          <div className="form-group--number">
                            <button className="minus"><span>-</span></button>
                            <input className="form-control" type="text" defaultValue={2} />
                            <button className="plus"><span>+</span></button>
                          </div>
                        </td>
                        <td>$300</td>
                        <td>
                          <div className="ps-remove" />
                        </td>
                      </tr>
                      <tr>
                        <td><a className="ps-product__preview" href="product-detail.html"><img className="mr-15" src="images/product/cart-preview/2.jpg" alt="" /> The Crusty Croissant</a></td>
                        <td>$150</td>
                        <td>
                          <div className="form-group--number">
                            <button className="minus"><span>-</span></button>
                            <input className="form-control" type="text" defaultValue={2} />
                            <button className="plus"><span>+</span></button>
                          </div>
                        </td>
                        <td>$300</td>
                        <td>
                          <div className="ps-remove" />
                        </td>
                      </tr>
                      <tr>
                        <td><a className="ps-product__preview" href="product-detail.html"><img className="mr-15" src="images/product/cart-preview/3.jpg" alt="" />The Rolling Pin</a></td>
                        <td>$150</td>
                        <td>
                          <div className="form-group--number">
                            <button className="minus"><span>-</span></button>
                            <input className="form-control" type="text" defaultValue={2} />
                            <button className="plus"><span>+</span></button>
                          </div>
                        </td>
                        <td>$300</td>
                        <td>
                          <div className="ps-remove" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="ps-cart__actions">
                    <div className="ps-cart__promotion">
                      <div className="form-group">
                        <div className="ps-form--icon"><i className="fa fa-angle-right" />
                          <input className="form-control" type="text" placeholder="Promo Code" />
                        </div>
                      </div>
                      <div className="form-group">
                        <button className="ps-btn ps-btn--gray">Continue Shopping</button>
                      </div>
                    </div>
                    <div className="ps-cart__total">
                      <h3>Total Price: <span> 2599.00 $</span></h3><a className="ps-btn" href="checkout.html">Process to checkout<i className="ps-icon-next" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps-subscribe">
              <div className="ps-container">
                <div className="row">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                    <h3><i className="fa fa-envelope" />Sign up to Newsletter</h3>
                  </div>
                  <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12 ">
                    <form className="ps-subscribe__form" action="do_action" method="post">
                      <input className="form-control" type="text" placeholder />
                      <button>Sign up now</button>
                    </form>
                  </div>
                  <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 ">
                    <p>...and receive  <span>$20</span>  coupon for first shopping.</p>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </main>
          </body>
     
        
      );
}
}


export default Checkout;