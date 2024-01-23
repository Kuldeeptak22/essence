import axiosInstance from "../../instance";
import { ActionName } from "../../utils/nameSpace";
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


export const getCartItems = () => {
  return (dispatch) => {
    dispatch({ type: GET_CART_ITEMS_PENDING });
    axiosInstance
      .get(`/carts/get_from_cart`)
      .then((res) => {
        dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: GET_CART_ITEMS_FAILED, payload: err.message });
      });
  };
};
export const addCartItems = (id) => {
  return (dispatch) => {
    dispatch({ type: ADD_CART_ITEMS_PENDING });
    axiosInstance
      .post(`/carts/add_to_cart`, { productID: id })
      .then((res) => {
        dispatch({ type: ADD_CART_ITEMS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: ADD_CART_ITEMS_FAILED, payload: err.message });
      });
  };
};
export const incrementQuantity = (id) => {
  return (dispatch) => {
    dispatch({ type: INCREMENT_CART_ITEMS_PENDING });
    axiosInstance
      .put(`/carts/update_cart_item/${id}?type=inc`)
      .then((res) => {
        dispatch({ type: INCREMENT_CART_ITEMS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: INCREMENT_CART_ITEMS_FAILED, payload: err.message });
      });
  };
};
export const decrementQuantity = (id) => {
  return (dispatch) => {
    dispatch({ type: DECREMENT_CART_ITEMS_PENDING });
    axiosInstance
      .put(`/carts/update_cart_item/${id}?type=desc`)
      .then((res) => {
        dispatch({ type: DECREMENT_CART_ITEMS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: DECREMENT_CART_ITEMS_FAILED, payload: err.message });
      });
  };
};
export const removeCartItem = (id) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEMS_PENDING });
    axiosInstance
      .delete(`/carts/delete_cart_item/${id}`)
      .then((res) => {
        dispatch({ type: REMOVE_CART_ITEMS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: REMOVE_CART_ITEMS_FAILED, payload: err.message });
      });
  };
};
export const getCartTotalItems = () => {
  return (dispatch) => {
    dispatch({ type: GET_CART_TOTAL_ITEMS_PENDING });
    axiosInstance
      .get(`/carts/get_from_cart`)
      .then((res) => {
        dispatch({
          type: GET_CART_TOTAL_ITEMS_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_CART_TOTAL_ITEMS_FAILED, payload: err.message });
      });
  };
};
export const getCartTotalAmount = () => {
  return (dispatch) => {
    dispatch({ type: GET_CART_TOTAL_AMOUNT_PENDING });
    axiosInstance
      .get(`/carts/get_from_cart`)
      .then((res) => {
        dispatch({
          type: GET_CART_TOTAL_AMOUNT_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_CART_TOTAL_AMOUNT_FAILED, payload: err.message });
      });
  };
};
