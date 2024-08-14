export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
