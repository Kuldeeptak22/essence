import { ActionName } from "../../utils/nameSpace";

const initialState = {
  categories: [],
  success: false,
  error: null,
  isLoading: false,
};
const {
  GET_CATEGORIES_PENDING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
} = ActionName;

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;
