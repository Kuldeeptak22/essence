import { ActionName } from "../../utils/nameSpace";

const initialState = {
  subCategories: [],
  success: false,
  error: null,
  isLoading: false,
};
const {
  GET_SUB_CATEGORIES_PENDING,
  GET_SUB_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_FAILED,
} = ActionName;

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORIES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subCategories: action.payload,
      };
    case GET_SUB_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        subCategories: action.payload,
      };
    default:
      return state;
  }
};
export default subCategoryReducer;
