import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgotPasswordRequest: ['phoneNumber'],
  forgotPasswordSuccess: ['response','phoneNumber'],
  forgotPasswordFailure: ['error'],

  verificationRequestPasswordReset: ['token'],
  verificationSuccessPasswordReset: ['verified','code'],
  verificationFailurePasswordReset: ['error'],

  passwordResetRequest: ['data'],
  passwordResetSuccess: ['data'],
  passwordResetFailure: ['error'],
})

export const ForgotPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  response: null,
  error: null,
  fetching: false,
  sendPasswordReset: false,
  phoneNumber:0,
  code:null,
  errorVerified:null,
  fetchingVerified:false,
  verified: false,

  errorPasswordReset:null,
  fetchingPasswordReset:false,
  PasswordReset: null,
})

/* ------------- Reducers ------------- */

// we're attempting to request a password reset email
export const request = (state) => state.merge({ fetching: true, sendPasswordReset:false })

// we've successfully request to reset the password
export const success = (state,{response, phoneNumber}) => state.merge({ fetching: false, error: null, sendPasswordReset:true, phoneNumber })

// we've had a problem requesting to reset the password
export const failure = (state, { error }) => state.merge({ fetching: false, error, sendPasswordReset:false })



export const requestVerification = state => state.merge({ fetchingVerified: true , verified: false,errorVerified:null})
export const successVerification = (state, {verified, code}) => state.merge({ fetchingVerified: false, errorVerified: null, verified: true,code})
export const failureVerification = (state, { error }) => state.merge({ fetchingVerified: false, verified: false, errorVerified:true })

export const requestPasswordReset = state => state.merge({ fetchingPasswordReset: true , PasswordReset: null,errorPasswordReset:null})
export const successPasswordReset = (state, {PasswordReset}) => INITIAL_STATE
export const failurePasswordReset = (state, { error }) => state.merge({ fetchingPasswordReset: false, PasswordReset: null, errorPasswordReset:true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_PASSWORD_REQUEST]: request,
  [Types.FORGOT_PASSWORD_SUCCESS]: success,
  [Types.FORGOT_PASSWORD_FAILURE]: failure,

  [Types.VERIFICATION_REQUEST_PASSWORD_RESET]: requestVerification,
  [Types.VERIFICATION_SUCCESS_PASSWORD_RESET]: successVerification,
  [Types.VERIFICATION_FAILURE_PASSWORD_RESET]: failureVerification,

  [Types.PASSWORD_RESET_REQUEST]: requestPasswordReset,
  [Types.PASSWORD_RESET_SUCCESS]: successPasswordReset,
  [Types.PASSWORD_RESET_FAILURE]: failurePasswordReset,
})

/* ------------- Selectors ------------- */
