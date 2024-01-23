import axiosInstance from "../../instance";
import { ActionName } from "../../utils/nameSpace";
const { ADD_CONTACT_PENDING, ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILED } =
  ActionName;

export const addContact = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CONTACT_PENDING });
    axiosInstance
      .post(`/contacts/add_contact`, values)
      .then((res) => {
        dispatch({ type: ADD_CONTACT_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: ADD_CONTACT_FAILED, payload: err.message });
      });
  };
};
