import { ActionName } from "../../utils/nameSpace";

const initialState = {
  user: [],
  success: false,
  error: null,
  isLoading: false,
};
const {
  GET_USER_BY_EMAIL_PENDING,
  GET_USER_BY_EMAIL_SUCCESS,
  GET_USER_BY_EMAIL_FAILED,
} = ActionName;

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_EMAIL_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        success: true,
      };
    case GET_USER_BY_EMAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default userAuthReducer;
