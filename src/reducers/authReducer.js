import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
