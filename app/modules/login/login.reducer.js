import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['telephone'],
  loginSuccess: ['authToken', 'idToken'],
  loginFailure: ['error'],

  signupSocailRequest: ['user'],
  signupSocailSuccess: ['authToken', 'idToken'],
  signupSocailFailure: ['error'],

  verificationRequest: ['customer'],
  verificationSuccess: ['customer'],
  verificationFailure: ['error'],


  registerRequest: ['customer'],
  registerSuccess: ['customer'],
  registerFailure: ['error'],


  updateTelephoneRequest: ['customer'],
  updateTelephoneSuccess: ['customer'],
  updateTelephoneFailure: ['error'],

  resendCodeRequest: ['phoneNumber'],
  resendCodeSuccess: ['data'],
  resendCodeFailure: ['error'],


  logoutRequest: null,
  logoutSuccess: null,
  loginLoad: [],
  loginLoadSuccess: [],
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authToken: null,
  idToken: null,
  error: null,
  fetching: false,
  loading: false,
  errorVerification:null,
  fetchingVerification: false,
  customer:null,

  errorResend:null,
  fetchingResend:false,
  resend:null,

  updating:false,
  errorUpdating:null,
  updateCustomer:null,

  errorRegister:null,
  fetchingRegister: false,
  finished:null
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true, error: null });

// we've successfully logged in
export const success = (state, data) => {
  const { authToken, idToken } = data;
  return state.merge({ fetching: false, error: null, authToken, idToken });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, authToken: null });

// we're attempting to login
export const updateRequest = (state) => state.merge({ updating: true, errorUpdating: null });

// we've successfully logged in
export const updateSuccess = (state, data) => {
  const { customer } = data;
  return state.merge({ updating: false, errorUpdating: null, updateCustomer:customer });
};

// we've had a problem logging in
export const updateFailure = (state, { error }) => state.merge({ updating: false, errorUpdating: error, updateCustomer:null });


// we're attempting to login
export const verificationrequest = (state) => state.merge({ fetchingVerification: true, errorVerification: null });

// we've successfully logged in
export const verificationsuccess = (state, data) => {
  const { customer } = data;
  return state.merge({ fetchingVerification: false, errorVerification: null,customer });
};

// we've had a problem logging in
export const verificationfailure = (state, { error }) => state.merge({ fetchingVerification: false, errorVerification:error, customer: null });


export const resendCodeRequest = (state) => state.merge({ fetchingResend: true, verified: false, resend: null,errorResend:null,errorVerified:null,  })
export const resendCodesuccess = (state,{ data }) => state.merge({ fetchingResend: false, verified: false, errorResend: null, resend:true  })
export const resendCodefailure = (state, { error }) => state.merge({ fetchingResend: false, errorResend:error , verified: false, resend: false,})


// we're attempting to login
export const Registerrequest = (state) => state.merge({ fetchingRegister: true, errorRegister: null,finished:false  });

// we've successfully logged in
export const Registersuccess = (state, data) => {
  const { customer } = data;
  return state.merge({ fetchingRegister: false, errorRegister: null,finished:true });
};

// we've had a problem logging in
export const Registerfailure = (state, { error }) => state.merge({ fetchingRegister: false, errorRegister:error, customer: null,finished:false  });


// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true });

export const loadSuccess = (state) => state.merge({ loading: false });

// we need to logout, meaning clear access tokens and account
export const logoutRequest = (state) => state;

// we've logged out
export const logoutSuccess = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,

  [Types.SIGNUP_SOCAIL_REQUEST]: request,
  [Types.SIGNUP_SOCAIL_SUCCESS]: success,
  [Types.SIGNUP_SOCAIL_FAILURE]: failure,

  [Types.VERIFICATION_REQUEST]: verificationrequest,
  [Types.VERIFICATION_SUCCESS]: verificationsuccess,
  [Types.VERIFICATION_FAILURE]: verificationfailure,

  [Types.REGISTER_REQUEST]: Registerrequest,
  [Types.REGISTER_SUCCESS]: Registersuccess,
  [Types.REGISTER_FAILURE]: Registerfailure,

  [Types.UPDATE_TELEPHONE_REQUEST]: updateRequest,
  [Types.UPDATE_TELEPHONE_SUCCESS]: updateSuccess,
  [Types.UPDATE_TELEPHONE_FAILURE]: updateFailure,

  [Types.RESEND_CODE_REQUEST]: resendCodeRequest,
  [Types.RESEND_CODE_SUCCESS]: resendCodesuccess,
  [Types.RESEND_CODE_FAILURE]: resendCodefailure,

  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
});

/* ------------- Selectors ------------- */
