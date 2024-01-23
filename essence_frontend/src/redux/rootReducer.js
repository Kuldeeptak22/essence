import { combineReducers } from "redux";
import categoryReducer from "./categoryBar/categoryReducer";
import subCategoryReducer from "./subCategory/subCategoryReducer";
import productReducer from "./products/productReducer";
import addToCartReducer from "./addToCart/addToCartReducer";
import userAuthReducer from "./userAuth/userAuthReducer";
import searchReducer from "./Search/searchRouter";
import contactReducer from "./contact/contactReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  subCategory: subCategoryReducer,
  product: productReducer,
  cart: addToCartReducer,
  userData:userAuthReducer,
  search:searchReducer,
  contacts:contactReducer
});

export default rootReducer;
