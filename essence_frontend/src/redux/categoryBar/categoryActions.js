import axiosInstance from "../../instance";
import { ActionName } from "../../utils/nameSpace";
const {
  GET_CATEGORIES_PENDING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
} = ActionName;

export const getCategories = () => {
  return (dispatch) => {
    dispatch({ type: GET_CATEGORIES_PENDING });
    axiosInstance
      .get(`/categories/get_categories`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_CATEGORIES_FAILED, payload: err.message });
      });
  };
};
