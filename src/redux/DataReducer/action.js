import * as types from "./actionType";
import axios from "axios";

const {REACT_APP_GET_DATAI, REACT_APP_BACKEND_PORT} = process.env

const BackendServer = process.env.REACT_APP_API_BASE_URL;

const getData = (params) => (dispatch) => {
  dispatch({ type: types.GET_DATA_R });
  return axios
    .get(`${BackendServer}getImage`, params)
    // .get(`${REACT_APP_GET_DATAI}`, params)
    .then((res) => {
      dispatch({ type: types.GET_DATA_S, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_DATA_F });
    });
};



const updateData = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_DATA_R });
  return axios.post
    (`${BackendServer}admin1/`, {id,payload},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } )
    .then((res) => {
      dispatch({ type: types.UPDATE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_DATA_F });
    });
};


const deleteData = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_DATA_R });
  return axios
    .post(`${BackendServer}admin1`,{id},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => {
      dispatch({ type: types.DELETE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.DELETE_DATA_F });
    });
};

const addData = (details) => (dispatch) => {
  dispatch({ type: types.Add_DATA_R });
  return axios.post
    (`${BackendServer}admin2/`, {details},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } )
    .then((res) => {
      dispatch({ type: types.Add_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.Add_DATA_F });
    });
};




const getCoupon = (params) => (dispatch) => {
  dispatch({ type: types.GET_DATA_R });
  return axios
    .get(`${BackendServer}coupon`, params)
    .then((res) => {
      dispatch({ type: types.GET_DATA_S, payload: res.data });
    })
    .then((err) => {
      dispatch({ type: types.GET_DATA_F });
    });
};


const updateCoupon = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_DATA_R });
  return axios.post
    (`${BackendServer}coupon`, {id,payload},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } )
    .then((res) => {
      dispatch({ type: types.UPDATE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_DATA_F });
    });
};

const getOneCoupon = (id,mode) => (dispatch) => {
  dispatch({ type: types.UPDATE_DATA_R });
  return axios.post
    (`${BackendServer}couponGetOne`, {id,mode},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } )
    .then((res) => {
      return(res);
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_DATA_F });
    });
};

const deleteCoupon = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_DATA_R });
  return axios
    .post(`${BackendServer}coupon`,{id},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => {
      dispatch({ type: types.DELETE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.DELETE_DATA_F });
    });
};


const addCoupon = (details) => (dispatch) => {

  dispatch({ type: types.Add_DATA_R });
  return axios.post
    (`${BackendServer}couponAdd/`, {details},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } )
    .then((res) => {
      
    
      dispatch({ type: types.Add_DATA_S });

    })
    .catch((err) => {
      dispatch({ type: types.Add_DATA_F });
    });
};

const getBannerData = () => async (dispatch) => {
  dispatch({ type: types.GET_DATA_R });
  const res = await axios
    .get(`${BackendServer}banner`);
  dispatch({ type: types.GET_DATA_S, payload: res.data });
  const err = res;
  dispatch({ type: types.GET_DATA_F });
  return res;
};


const setProductData=(products)=>{
  // dispatch({ type: types.SET_SEARCH_QUERY, });
  return{
    type: types.GET_PRODUCTS,
    products: products.products,
    pages: products.totalProducts,
    category: products.category
  
}};


export { getData, updateData, deleteData,addData,getCoupon,updateCoupon,deleteCoupon,addCoupon,getOneCoupon,getBannerData,setProductData };
