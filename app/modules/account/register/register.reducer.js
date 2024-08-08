import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['user'],
  registerSuccess: ['registerAccount'],
  registerFailure: ['error'],
  registerationDoneRequest: [''],

  resendCodeRequest: ['phoneNumber'],
  resendCodeSuccess: ['data'],
  resendCodeFailure: ['error'],


  verificationRequest: ['token'],
  verificationSuccess: ['verified'],
  verificationFailure: ['error'],
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  errorResend:null,
  fetchingResend:false,
  errorVerified:null,
  fetchingVerified:false,
  fetching: false,
  registerAccount:null,
  verified: false,
  resend: null
  
})

/* ------------- Reducers ------------- */

// we're attempting to register
export const request = (state) => state.merge({ fetching: true , registerAccount:null, error:null})
export const requestVerification = state => state.merge({ fetchingVerified: true , verified: false,errorVerified:null})
export const resendCodeRequest = (state) => state.merge({ fetchingResend: true, verified: false, resend: null,errorResend:null,errorVerified:null,  })

// we've successfully registered
export const success = (state,action) => state.merge({ fetching: false, error: null, registerAccount:action.registerAccount })
export const successVerification = (state, {verified}) => state.merge({ fetchingVerified: false, errorVerified: null, verified: true})
export const resendCodesuccess = (state,{ data }) => state.merge({ fetchingResend: false, verified: false, errorResend: null, resend:true  })

// we've had a problem registering
export const failure = (state, { error }) => state.merge({ fetching: false, error, registerAccount:null })
export const failureVerification = (state, { error }) => state.merge({ fetchingVerified: false, verified: false, errorVerified:true })
export const resendCodefailure = (state, { error }) => state.merge({ fetchingResend: false, errorResend:error , verified: false, resend: false,})
export const RegistrationDoneRequest = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
  [Types.REGISTERATION_DONE_REQUEST]: RegistrationDoneRequest,

  [Types.VERIFICATION_REQUEST]: requestVerification,
  [Types.VERIFICATION_SUCCESS]: successVerification,
  [Types.VERIFICATION_FAILURE]: failureVerification,

  [Types.RESEND_CODE_REQUEST]: resendCodeRequest,
  [Types.RESEND_CODE_SUCCESS]: resendCodesuccess,
  [Types.RESEND_CODE_FAILURE]: resendCodefailure,
})

/* ------------- Selectors ------------- */
