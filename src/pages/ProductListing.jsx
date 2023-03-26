import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams,createSearchParams } from "react-router-dom";
import { getData } from "../redux/DataReducer/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React,{useState} from "react";
import { setSearchQuery } from "../redux/QueryReducer/action";
import Fuse from "fuse.js";






const Checkbox = ({ label, checked, onChange }) => { 

  return (
    <div className="checkbox-wrapper">
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

// products.filter(
//   (product) =>
//     queryParams.category.includes(product.category) &&
//     queryParams.color.includes(product.color)
// );



const ProductListing=()=>{
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [queryParams, setQueryParams] = useState({});

  const dispatch = useDispatch();
  const products1 = useSelector((store) => store.dataReducer.products);
  const category = ['Slides','Sneakers','Sports','FlipFlop'  ];
  const colors = ['Red','Black','Grey','Green','White'  ];

  const [checkedState2, setCheckedState2] = useState(
    new Array(colors.length).fill(false)
);

  const [checkedState, setCheckedState] = useState(
    new Array(category.length).fill(false)
);


const options = {
  keys: ["productName"],
  threshold: 0.4, // Adjust this value to control how "fuzzy" the search is
};
const fuse = new Fuse(products, options);

  
  
  const location = useLocation();
  const [searchParams,setSearchParams] = useSearchParams({});
  const [searchParams1, setSearchParams1] = useState({
    category: [],
    colors: [],
    size: [],
  });
  const searchQuery = useSelector((store) => store.queryReducer.search);



  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/${id}`);
    window.location.reload();
    window.scrollTo(0,0); 
  };



  useEffect(() => {

    setSearchParams(searchParams1);
  }, [searchParams1]);


  
  // useEffect(() => {
  //   if(searchQuery.query && searchQuery.query!==''){
  //     console.log('hi');
  //     setProducts(searchQuery.filteredProducts.map(function(item) { return item["item"]; }))
  //   }
    
  // }, [searchQuery]);

  




  const handleCategory = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    const checkedCategories = category.filter(
      (value, index) => updatedCheckedState[index]
    );
    console.log(searchQuery,'searchquery');
    setSearchParams1((prevState) => ({
      ...prevState,
      ['category']: checkedCategories,
      ['sizes']: selectedSizes,
    }));



    
    
    // console.log(checkedCategories);


    // const totalPrice = updatedCheckedState.reduce(
    //   (sum, currentState, index) => {
    //     if (currentState === true) {
    //       return sum + toppings[index].price;
    //     }
    //     return sum;
    //   },
    //   0
    // );

    // setTotal(totalPrice);
  };


  const handleColor = (position) => {
    const updatedCheckedState = checkedState2.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState2(updatedCheckedState);
    const checkedColor = colors.filter(
      (value, index) => updatedCheckedState[index]
    );
    setSearchParams1((prevState) => ({
      ...prevState,
      ['colors']: checkedColor,
    }));
  }




  

  useEffect(() => {
    if (location.search) {
      setSearchParams1((prevState) => ({
        ...prevState,
        ...(searchQuery.query ? { ['productName']: searchQuery.query } : {['productName']:''}),
      }));
      const query = {
        productName: searchParams.get('productName'),
        category: searchParams.getAll("category"),
        productGender: searchParams.getAll("productGender"),
        Quantity: searchParams.getAll("Quantity"),
        colors: searchParams.getAll("colors"),
        sizes: searchParams.getAll("sizes").map(Number),
    };
    console.log(!query.productName,'prodyctan')
    setQueryParams(query);
    console.log(query,'queryParams',searchQuery?.filteredProducts?.includes(products[0]),products[0],searchQuery.filteredProducts);
    setFilteredProducts(products.filter(product => {
      const { productName,sizes, colors, category } = query;
      if (
        (!productName || searchQuery.filteredProducts.some(p => JSON.stringify(p) === JSON.stringify(product))) &&
        (sizes.length === 0 || product.Sizes.some(size => size.some(s => sizes.includes(s)))) &&
        (colors.length === 0 || product.color.some(color => colors.includes(String(color)))) &&
        (category.length === 0 || category.includes(product.category))
      ) {
        console.log(product,'product')
        return true;
      }
      return false;
    }));;
    }
    else{
      setProducts(products1.filter(function (el) {
        return el.Quantity !== undefined; 
      }))
      setFilteredProducts(products1.filter(function (el) {
        return el.Quantity !== undefined; 
      }));
    }

    
  }, [dispatch, location.search, products1?.length,searchParams,searchQuery]);


  function handleSizeClick(size) {
    const newSelectedSizes = selectedSizes.includes(size)
    ? selectedSizes.filter(s => s !== size)
    : [...selectedSizes, size];

  setSelectedSizes(newSelectedSizes);

  setSearchParams1((prevState) => ({
    ...prevState,
    ['sizes']: newSelectedSizes,
  }));

  }

  function getClassNames(size) {
    return selectedSizes.includes(size) ? 'active' : 'inactive';
  }

  console.log(filteredProducts,searchQuery.filteredProducts);


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
                {/* <div className="ps-pagination">
                  <ul className="pagination">
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">...</a></li>
                  </ul>
                </div> */}
              </div>
              <div className="ps-product__columns">
                {filteredProducts.length==0? 
                <img style={{position:'relative',top:'-17rem',marginLeft:'16%'}} src='https://img.freepik.com/free-vector/hand-drawn-404-error_23-2147737389.jpg?w=740&t=st=1679744345~exp=1679744945~hmac=5cbc63e4ccef5f0b2b3708bbfa87ac93b9715b59dd8c8bc93e27bca5a288bc7d'></img>
                :null}
              {filteredProducts && filteredProducts.map((item) => (
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
                    {category.map((item,index)=>{
                      return(
                         <>
                         <li> <Checkbox label={item} name={item} checked={checkedState[index]} onChange={() => handleCategory(index)} /></li>
                    
                    </> 
                      )
                      
                    })}
                  {/* <li> <Checkbox label="Slides" name="Slides" checked={searchParams1.category.includes('Slides')} onChange={(e) => handleFilterChange("category", [
                ...searchParams1.category,
                e.target.value,
                e.target.checked,
              ])
            } /></li>
                    <li> <Checkbox label="Sneakers" name="Sneakers" checked={searchParams1.category.includes('Sneakers')} onChange={(e) => handleFilterChange("category", [
                ...searchParams1.category,
                e.target.value,
                e.target.checked,
              ])
            } /></li>
                    <li> <Checkbox label="Sports" name="Sports" checked={searchParams1.category.includes('Sports')} onChange={(e) => handleFilterChange("category", [
                ...searchParams1.category,
                e.target.value,
                e.target.checked,
              ])
            } /></li>
                    <li> <Checkbox label="FlipFlop" name="FlipFlop" checked={searchParams1.category.includes('FlipFlop')} onChange={(e) => handleFilterChange("category", [
                ...searchParams1.category,
                e.target.value,
                e.target,
              ])
            } /></li> */}
                    {/* <li><a href="product-listing.html">Soccer(108)</a></li>
                    <li><a href="product-listing.html">Trainning &amp; game(47)</a></li>
                    <li><a href="product-listing.html">More</a></li> */}
                  </ul>
                </div>
              </aside>
              {/* <aside className="ps-widget--sidebar ps-widget--filter">
                <div className="ps-widget__header">
                  <h3>Price</h3>
                </div>
                <div className="ps-widget__content">
                  <div className="ac-slider" data-default-min={300} data-default-max={2000} data-max={3450} data-step={50} data-unit="$" />
                  <p className="ac-slider__meta">Price:<span className="ac-slider__value ac-slider__min" />-<span className="ac-slider__value ac-slider__max" /></p><a className="ac-slider__filter ps-btn" href="#">Filter</a>
                </div>
              </aside> */}
              {/* <aside className="ps-widget--sidebar ps-widget--category">
                <div className="ps-widget__header">
                  <h3>Shoe Brand</h3>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--checked">
                    <li className="current"><a href="product-listing.html">Nike(521)</a></li>
                    <li><a href="product-listing.html">Adidas(76)</a></li>
                    <li><a href="product-listing.html">Baseball(69)</a></li>
                    <li><a href="product-listing.html">Gucci(36)</a></li>
                    <li><a href="product-listing.html">Dior(108)</a></li>
                    <li><a href="product-listing.html">B&amp;G(108)</a></li>
                    <li><a href="product-listing.html">Louis Vuiton(47)</a></li>
                  </ul>
                </div>
              </aside> */}
              {/* <aside className="ps-widget--sidebar ps-widget--category">
                <div className="ps-widget__header">
                  <h3>Width</h3>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--checked">
                    <li className="current"><a href="product-listing.html">Narrow</a></li>
                    <li><a href="product-listing.html">Regular</a></li>
                    <li><a href="product-listing.html">Wide</a></li>
                    <li><a href="product-listing.html">Extra Wide</a></li>
                  </ul>
                </div>
              </aside> */}
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
                          <td className={getClassNames(1)} onClick={() => handleSizeClick(1)}>1</td>
                          <td className={getClassNames(2)} onClick={() => handleSizeClick(2)}>2</td>
                          <td className={getClassNames(3)} onClick={() => handleSizeClick(3)}>3</td>
                          <td className={getClassNames(4)} onClick={() => handleSizeClick(4)}>4</td>
                        </tr>
                        <tr>
                          <td className={getClassNames(5)} onClick={() => handleSizeClick(5)}>5</td>
                          <td className={getClassNames(6)} onClick={() => handleSizeClick(6)}>6</td>
                          <td className={getClassNames(7)} onClick={() => handleSizeClick(7)}>7</td>
                          <td className={getClassNames(8)} onClick={() => handleSizeClick(8)}>8</td>
                         
                        </tr>
                        <tr>
                          <td className={getClassNames(9)} onClick={() => handleSizeClick(9)}><a>9</a></td>
                          <td className={getClassNames(10)} onClick={() => handleSizeClick(10)}>10</td>
                          <td className={getClassNames(11)} onClick={() => handleSizeClick(11)}>11</td>
                          <td className={getClassNames(12)} onClick={() => handleSizeClick(12)}>12</td>
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
                    {colors.map((item,index)=>{
                      return(
                         <>
                         <li style={{width:'10rem'}}> <Checkbox label={item} name={item} checked={checkedState2[index]} onChange={() => handleColor(index)} /></li>
                    
                    </> 
                      )
                      
                    })}
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