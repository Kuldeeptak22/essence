import axiosInstance from "../../instance";
import { ActionName } from "../../utils/nameSpace";
const {
  GET_SEARCH_ITEMS_PENDING,
  GET_SEARCH_ITEMS_SUCCESS,
  GET_SEARCH_ITEMS_FAILED,
} = ActionName;

export const getSearchItems = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_SEARCH_ITEMS_PENDING });
    axiosInstance
      .get(`/products/get_products?search=${data}`)
      .then((res) => {
        dispatch({ type: GET_SEARCH_ITEMS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_SEARCH_ITEMS_FAILED, payload: err.message });
      });
  };
};
