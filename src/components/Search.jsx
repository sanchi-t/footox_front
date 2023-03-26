import React, { useState } from "react";
// import productsData from "./productsData";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import './Search.css';
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/QueryReducer/action";
import { createSearchParams } from "react-router-dom";
// import { createStore } from 'redux';
const Search=()=>{

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products1 = useSelector((store) => store.dataReducer.products);
  const products = products1.filter(function (el) {
    return el.Quantity !== undefined; 
  });
  // const searchresults = useSelector((store) => )
  

  const [fProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const options = {
    keys: ["productName"],
    threshold: 0.4, // Adjust this value to control how "fuzzy" the search is
  };
  const fuse = new Fuse(products, options);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = fuse.search(query);
    setQuery(query);
    setFilteredProducts(filtered);
    setShowDropdown(true);
    // console.log(fProducts,products);
  };
  const handleClick=(id)=>{
    navigate(`/${id}`);
    window.location.reload();
    window.scrollTo(0,0); 
  }
  const handleSumbit=(e)=>{
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
  const category = params.getAll("category");
  const size = params.getAll("size");
  const color = params.getAll("color");
  let searchQuery = query;
  if (category) {
    searchQuery += " " + '&category='+category;
  }
  if (size) {
    searchQuery += " " + size;
  }
  if (color) {
    searchQuery += " " + color;
  }
    navigate({
      pathname: "/allproducts",
      search: `?${createSearchParams({
          productName: query,
          category: category,
          color:color,
      })}`
  });
  const filteredProducts=fProducts.map(function(item) { return item["item"]; })
    console.log(filteredProducts,'filteredProducts');
    dispatch(setSearchQuery({query,filteredProducts}));
  }
    return(
    <>
    <form className="ps-search--header" onSubmit={handleSumbit}>
        <input id="myInput" className="form-control" type="text" placeholder="Search Product…"  onChange={handleSearch} />
        <button><i className="ps-icon-search" /></button>
        {showDropdown &&  (
        <ul id="myUL">
          {fProducts.map((product) => {
            return(<li onClick={()=>handleClick(product.item.productId)}><a><img id="myImg" src={product.item.image[0][0]}/><p>{product.item.productName}</p></a></li>)
            })}
        </ul>
      )}

    </form>
    
  </>
  );
}


export default Search;