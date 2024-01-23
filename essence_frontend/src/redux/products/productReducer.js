import { ActionName } from "../../utils/nameSpace";

const initialState = {
  products: [],
  success: false,
  error: null,
  isLoading: false,
};
const { GET_PRODUCTS_PENDING, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILED } =
  ActionName;

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
