import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _  from 'lodash'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  checkOutRequest: ['payment'],
  checkOutSuccess: ['transaction'],
  checkOutFailure: ['error'],
  paymentSetupRequest: ['option'],
  paymentSetupSuccess: ['paymentSetup'],
  paymentSetupFailure: ['payemtnError'],
  resetPayment:['']
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transaction: null,
  errorTransaction: null,
  fetchingTransaction: false,

  paymentSetup: [],
  errorPayment: null,
  fetchingPayment: false,

  success: false,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const  checkOutRequest = (state) => state.merge({ fetchingTransaction: true,errorTransaction: null ,success: false})

export const checkOutSuccess = (state, action) => {
	const { transaction } = action
	 
		return state.merge({
			fetchingTransaction: false,
			errorTransaction: null,
			transaction,
      success: true,

		})
	}
// we've had a problem logging in
export const  checkOutFailure = (state, { error }) => state.merge({ fetchingTransaction: false,errorTransaction: error,transaction:null,success: false})


// we're attempting to login
export const  paymentSetupRequest = (state) => state.merge({ fetchingPayment: true,errorPayment: null ,success: false})

export const paymentSetupSuccess = (state, action) => {
	const { paymentSetup } = action
		return state.merge({
			fetchingPayment: false,
			errorPayment: null,
			paymentSetup,
		})
	}
// we've had a problem logging in
export const  paymentSetupFailure = (state, { error }) => state.merge({ fetchingTransaction: false,errorTransaction: error,transaction:null,success: false})


export const resetPayment = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_OUT_REQUEST]: checkOutRequest,
  [Types.CHECK_OUT_SUCCESS]: checkOutSuccess,
  [Types.CHECK_OUT_FAILURE]: checkOutFailure,
  [Types.PAYMENT_SETUP_REQUEST]: paymentSetupRequest,
  [Types.PAYMENT_SETUP_SUCCESS]: paymentSetupSuccess,
  [Types.PAYMENT_SETUP_FAILURE]: paymentSetupFailure,
  [Types.RESET_PAYMENT]: resetPayment,

  
})

/* ------------- Selectors ------------- */
