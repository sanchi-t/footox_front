import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { dataReducer,productReducer } from "./DataReducer/reducer";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { cartReducer } from "./CartReducer/reducer";
import { pagesReducer } from "./PagesReducer/reducer";
import { wishReducer } from "./WishReducer/wishReducer";
import { queryReducer } from "./QueryReducer/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  dataReducer,
  cart: cartReducer,
  AuthReducer,
  pagesReducer,
  wishReducer,
  queryReducer,
  productReducer,

});

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
