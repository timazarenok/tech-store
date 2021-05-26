import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../constants";
import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: { email: "", password: "" },
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload.data },
      };
    default:
      return state;
  }
};
