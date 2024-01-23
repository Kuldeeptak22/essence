import { ActionName } from "../../utils/nameSpace";

const initialState = {
  searchItems: [],
  success: false,
  error: null,
  isLoading: false,
};
const {
  GET_SEARCH_ITEMS_PENDING,
  GET_SEARCH_ITEMS_SUCCESS,
  GET_SEARCH_ITEMS_FAILED,
} = ActionName;

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_ITEMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchItems: action.payload,
      };
    case GET_SEARCH_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        searchItems: action.payload,
      };
    default:
      return state;
  }
};
export default searchReducer;
