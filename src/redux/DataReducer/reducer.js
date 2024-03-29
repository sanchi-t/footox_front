import * as data from "./actionType";

const init = {
  products: [],
  isLoading: false,
  isError: false,
};

const init1 = {
  products: [],
  totalProducts:0,
  category: [],
  isLoading: false,
  isError: false,
};

const dataReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case data.GET_DATA_R: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case data.GET_DATA_S: {
      return {
        ...state,
        isLoading: false,
        isError:false,
        products: payload,
      };
    }
    case data.GET_DATA_F: {
      return {
        ...state,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};

const dataReducer1 = (state = init1, action) => {
  const { type, payload } = action;
  switch (type) {
    case data.GET_DATA_R: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case data.GET_DATA_S: {
      return {
        ...state,
        isLoading: false,
        isError:false,
        products1: payload,
      };
    }
    case data.GET_DATA_F: {
      return {
        ...state,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};


const productReducer = (state = init1, action) => {
  // const { type, payload } = action;
  switch (action.type) {
    
    case data.GET_PRODUCTS: {
      return {
        ...state,
        products: action.products,
        pages: action.totalProducts,
        category: action.category,
        isError:false,
      };
    }
    default: {
      return state;
    }
  }
};

export { dataReducer,dataReducer1,productReducer };
