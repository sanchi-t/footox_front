import {SET_SEARCH_QUERY} from "./actionType";

const init = {
  search: {},
  isError: false,
};
// const defaultBirds = [
//   {
//     name: 'robin',
//     views: 1,
//   }
// ];



const queryReducer = (state = init, action) => {
  // const { type, payload } = action;
  switch (action.type) {
    
    case SET_SEARCH_QUERY: {
      return {
        ...state,
        search: action.query,
        isError:false,
      };
    }
    default: {
      return state;
    }
  }
};


export { queryReducer };
