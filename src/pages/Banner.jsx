import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData, getBannerData } from "../redux/DataReducer/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import axios from "axios";
import { IGEmbed } from 'react-ig-embed';

const BackendServer = process.env.REACT_APP_BACKEND_SERVER;


const Banner = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const products1 = useSelector((store) => store.dataReducer.products);

  const products = useSelector((store) => store.dataReducer.products);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/${id}`);
    window.location.reload();
  };
  
  const sortBy = searchParams.get("sortBy");

  const queryParams = {
    params: {
      category: searchParams.getAll("category"),
      gender: searchParams.getAll("gender"),
      colortype: searchParams.getAll("colortype"),
      sizes: searchParams.getAll("sizes"),
      _sort: sortBy && "rating",
      _order: sortBy,
    },
  };
  const [prod, setProd] = useState();

  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}banner`)
      setProd(response.data)
    }
    const l = axiosTest()
  }, [products])
  console.log('kuhoo', prod)
  useEffect(() => {
    dispatch(getData(queryParams));
  }, [])
  console.log('helloo', products, products1)

  return (
    <React.Fragment>
   <IGEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" />

    </React.Fragment>
  );
}



export default Banner;