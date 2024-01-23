import axiosInstance from "../../instance";
import { ActionName } from "../../utils/nameSpace";
const {
  GET_SUB_CATEGORIES_PENDING,
  GET_SUB_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_FAILED,
} = ActionName;

export const getSubCategories = () => {
  return (dispatch) => {
    dispatch({ type: GET_SUB_CATEGORIES_PENDING });
    axiosInstance
      .get(`/subcategories/get_subcategories`)
      .then((res) => {
        dispatch({ type: GET_SUB_CATEGORIES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_SUB_CATEGORIES_FAILED, payload: err.message });
      });
  };
};
