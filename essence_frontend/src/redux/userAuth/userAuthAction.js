import axiosInstance from "../../instance";
import { ActionName } from "../../utils/nameSpace";
const {
  GET_USER_BY_EMAIL_PENDING,
  GET_USER_BY_EMAIL_SUCCESS,
  GET_USER_BY_EMAIL_FAILED,
} = ActionName;

export const getUserByEmail = (userEmail) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_BY_EMAIL_PENDING });
    axiosInstance
      .get(`/users/get_user_by_email?userEmail=${userEmail}`)
      .then((res) => {
        dispatch({ type: GET_USER_BY_EMAIL_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: GET_USER_BY_EMAIL_FAILED, payload: err.message });
      });
  };
};
