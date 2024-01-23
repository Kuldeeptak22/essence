import { ActionName } from "../../utils/nameSpace";

const initialState = {
  contact: [],
  success: false,
  error: null,
  isLoading: false,
};
const {
    ADD_CONTACT_PENDING, ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILED
} = ActionName;

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contact: action.payload,
      };
    case ADD_CONTACT_FAILED:
      return {
        ...state,
        isLoading: false,
        contact: action.payload,
      };
    default:
      return state;
  }
};
export default contactReducer;
