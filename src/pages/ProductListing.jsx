import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData } from "../redux/DataReducer/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React,{useState} from "react";
import { setSearchQuery } from "../redux/QueryReducer/action";




const ProductListing=()=>{
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const products1 = useSelector((store) => store.dataReducer.products);
  
  
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = useSelector((store) => store.queryReducer.search);

  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/${id}`);
    window.location.reload();
    window.scrollTo(0,0); 
  };

  useEffect(() => {
    setProducts(products1.filter(function (el) {
      return el.Quantity !== undefined; 
    }))
    if (location.search || products.length === 0) {
      const sortBy = searchParams.get("sortBy");

      const queryParams = {
        params: {
          category: searchParams.getAll("category"),
          productGender: searchParams.getAll("productGender"),
          Quantity: searchParams.getAll("Quantity"),
          color: searchParams.getAll("color"),
          Sizes: searchParams.getAll("Sizes"),
          _sort: sortBy && "rating",
          _order: sortBy,
        },
      };
      dispatch(getData(queryParams));
    }

    if(searchQuery.query && searchQuery.query!==''){
      setProducts(searchQuery.filteredProducts.map(function(item) { return item["item"]; }))
    }
    else{
      
      setProducts(products1.filter(function (el) {
          return el.Quantity !== undefined; 
        }))
    }
  }, [dispatch, location.search, products1?.length, searchParams,searchQuery.query]);
  console.log(products,searchParams.get('GET'));
  console.log(searchQuery,'yooooooooooooooooooooo');

    return(
        <>
        <Header></Header>
        <div>
        <main className="ps-main">
          <div className="ps-products-wrap pt-80 pb-80">
            <div className="ps-products" data-mh="product-listing">
              <div className="ps-product-action">
                {/* <div className="ps-product__filter">
                  <select className="ps-select selectpicker">
                    <option value={1}>Shortby</option>
                    <option value={2}>Name</option>
                    <option value={3}>Price (Low to High)</option>
                    <option value={3}>Price (High to Low)</option>
                  </select>
                </div> */}
                <div className="ps-pagination">
                  <ul className="pagination">
                    {/* <li><a href="#"><i className="fa fa-angle-left" /></a></li> */}
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">...</a></li>
                    {/* <li><a href="#"><i className="fa fa-angle-right" /></a></li> */}
                  </ul>
                </div>
              </div>
              <div className="ps-product__columns">
              {products && products.map((item) => (
                <div className="ps-product__column" key={item._id}>
                  <div className="ps-shoe mb-30">
                    <div className="ps-shoe__thumbnail">
                      {/* <div className="ps-badge"><span>New</span></div> */}
                      {/* <div className="ps-badge ps-badge--sale ps-badge--2nd"><span>-35%</span></div> */}
                      <a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart" /></a><img style ={{height : '350px', width : '300px'}} src={item.image?.[0][0]} alt="" /><a className="ps-shoe__overlay" onClick={() => handleDes(item.productId)} />
                    </div>
                    <div className="ps-shoe__content">
                      <div className="ps-shoe__variants">
                        <div className="ps-shoe__variant normal"><img  style = {{height : '50px',width :"50px" }} src={item.image?.[0][1]} alt="" /><img style ={{height : '50px',width :"50px" }} src={item.image?.[0][2]}alt="" /><img style ={{height : '50px',width :"50px" }} src={item.image?.[0][3]} alt="" /><img style ={{height : '50px',width : "50px" }} src={item.image?.[0][4]} alt="" /></div>
                        {/* <select className="ps-rating ps-shoe__rating">
                          <option value={1}>1</option>
                          <option value={1}>2</option>
                          <option value={1}>3</option>
                          <option value={1}>4</option>
                          <option value={2}>5</option>
                        </select> */}
                      </div>
                      <div className="ps-shoe__detail" key={item.id} style={{textAlign:'left'}}>
                                <div key={item.id} style={{inlineSize: "15rem",  overflowWrap: "break-word"}}><a className="ps-shoe__name" onClick={() => handleDes(item.productId)}>{item.productName}</a></div>
                                <p key={item.id} className="ps-shoe__categories"><a key={item.id} href="#">
                                  {item.gender} shoes</a>,<a key={item.id} href="#"> Nike</a>,<a key={item.id} href="#"> Jordan</a></p><span key={item.id} className="ps-shoe__price">
                                  <del key={item.id}>₹{item.original_price}</del> ₹{item.selling_price}</span>
                              </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              {/* <div className="ps-product-action"> */}
                {/* <div className="ps-product__filter">
                  <select className="ps-select selectpicker">
                    <option value={1}>Shortby</option>
                    <option value={2}>Name</option>
                    <option value={3}>Price (Low to High)</option>
                    <option value={3}>Price (High to Low)</option>
                  </select>
                </div> */}
                {/* <div className="ps-pagination">
                  <ul className="pagination">
                    <li><a href="#"><i className="fa fa-angle-left" /></a></li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#"><i className="fa fa-angle-right" /></a></li>
                  </ul>
                </div> */}
              {/* </div> */}
            </div>
            <div className="ps-sidebar" data-mh="product-listing">
              <aside className="ps-widget--sidebar ps-widget--category">
                <div className="ps-widget__header">
                  <h3>Category</h3>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--checked">
                    <li className="current"><a href="product-listing.html">Slides</a></li>
                    <li><a href="product-listing.html">Sneakers</a></li>
                    <li><a href="product-listing.html">Sports</a></li>
                    <li><a href="product-listing.html">Flip-Flop</a></li>
                    {/* <li><a href="product-listing.html">Soccer(108)</a></li>
                    <li><a href="product-listing.html">Trainning &amp; game(47)</a></li>
                    <li><a href="product-listing.html">More</a></li> */}
                  </ul>
                </div>
              </aside>
              
              <div className="ps-sticky desktop">
                <aside className="ps-widget--sidebar">
                  <div className="ps-widget__header">
                    <h3>Size</h3>
                  </div>
                  <div className="ps-widget__content">
                    <table className="table ps-table--size">
                      <tbody>
                        <tr>
                          {/* <td className="active"></td> */}
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                          <td>8</td>
                         
                        </tr>
                        <tr>
                          <td><a>9</a></td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          {/* <td>14</td> */}
                        </tr>
                        {/* <tr>
                          <td>4.5</td>
                          <td>7</td>
                          <td>9.5</td>
                          <td>12</td>
                          <td>14.5</td>
                        </tr> */}
                        {/* <tr>
                          <td>5</td>
                          <td>7.5</td>
                          <td>10</td>
                          <td>12.5</td>
                          <td>15</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </aside>
                <aside className="ps-widget--sidebar">
                  <div className="ps-widget__header">
                    <h3>Color</h3>
                  </div>
                  <div className="ps-widget__content">
                    <ul className="ps-list--color">
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          {/* <div className="ps-subscribe">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                  <h3><i className="fa fa-envelope" />Sign up to Newsletter</h3>
                </div>
                <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12 ">
                  <form className="ps-subscribe__form" action="do_action" method="post">
                    <input className="form-control" type="text" />
                    <button>Sign up now</button>
                  </form>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 ">
                  <p>...and receive  <span>$20</span>  coupon for first shopping.</p>
                </div>
              </div>
            </div>
          </div> */}
          
        </main>
      </div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>

          <Footer></Footer>
        </>
    )
}



export default ProductListing;