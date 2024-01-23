import { ActionName } from "../../utils/nameSpace";

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
  success: false,
  error: null,
  isLoading: false,
};
const {
  GET_CART_ITEMS_PENDING,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAILED,
  ADD_CART_ITEMS_PENDING,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_FAILED,
  INCREMENT_CART_ITEMS_PENDING,
  INCREMENT_CART_ITEMS_SUCCESS,
  INCREMENT_CART_ITEMS_FAILED,
  DECREMENT_CART_ITEMS_PENDING,
  DECREMENT_CART_ITEMS_SUCCESS,
  DECREMENT_CART_ITEMS_FAILED,
  REMOVE_CART_ITEMS_PENDING,
  REMOVE_CART_ITEMS_SUCCESS,
  REMOVE_CART_ITEMS_FAILED,
  GET_CART_TOTAL_ITEMS_PENDING,
  GET_CART_TOTAL_ITEMS_SUCCESS,
  GET_CART_TOTAL_ITEMS_FAILED,
  GET_CART_TOTAL_AMOUNT_PENDING,
  GET_CART_TOTAL_AMOUNT_SUCCESS,
  GET_CART_TOTAL_AMOUNT_FAILED,
} = ActionName;

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload,
        error: null,
      };
    case GET_CART_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        cartItems: [],
        error: action.payload,
      };
    case ADD_CART_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
        error: null,
      };
    case ADD_CART_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    case INCREMENT_CART_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case INCREMENT_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
        error: null,
      };
    case INCREMENT_CART_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    case DECREMENT_CART_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case DECREMENT_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
        error: null,
      };
    case DECREMENT_CART_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    case REMOVE_CART_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case REMOVE_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
        error: null,
      };
    case REMOVE_CART_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    case GET_CART_TOTAL_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_TOTAL_ITEMS_SUCCESS:
      let updatedItemValue = action.payload.reduce(
        (initialValue, currentElement) => {
          let { quantity } = currentElement;
          initialValue = initialValue + quantity;
          return initialValue;
        },
        0
      );
      return {
        ...state,
        isLoading: false,
        totalItems: updatedItemValue,
      };
    case GET_CART_TOTAL_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        totalItems: 0,
        error: action.payload,
      };
    case GET_CART_TOTAL_AMOUNT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_TOTAL_AMOUNT_SUCCESS:
      let updatedItemAmount = action.payload.reduce(
        (initialValue, currentElement) => {
          let { quantity, price } = currentElement;
          let subTotal = quantity * price;
          initialValue = initialValue + subTotal;
          return initialValue;
        },
        0
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        totalAmount: updatedItemAmount,
      };
    case GET_CART_TOTAL_AMOUNT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addToCartReducer;
