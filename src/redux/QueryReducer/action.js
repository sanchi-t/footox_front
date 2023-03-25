import {SET_SEARCH_QUERY}  from "./actionType";

export const setSearchQuery=(query)=>{
  // dispatch({ type: types.SET_SEARCH_QUERY, });
  return{
  type: SET_SEARCH_QUERY,
  query: query
  
}};

// const addData = (details) => (dispatch) => {
//   dispatch({ type: types.Add_DATA_R });
//   return axios.post
//     (`${BackendServer}admin2/`, {details},{
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     } )
//     .then((res) => {
//       dispatch({ type: types.Add_DATA_S });
//     })
//     .catch((err) => {
//       dispatch({ type: types.Add_DATA_F });
//     });
// };
