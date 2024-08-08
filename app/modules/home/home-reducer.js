import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  serviceRequest: ['options'],
  serviceSuccess: ['services'],
  serviceFailure: ['error'],

  createTransactionRequest: ['transaction'],
  createTransactionSuccess: ['transaction'],
  createTransactionFailure: ['error'],

  homeProductRequest: ['product'],
  homeProductSuccess: ['product'],
  homeProductFailure: ['error'],

  versionRequest: ['option'],
  versionSuccess: ['version'],
  versionFailure: ['error'],
  reset:[]
});

export const HomeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  services: null,
  errorServices: null,
  fetchingServices: false,

  product: null,
  errorproduct: null,
  fetchingproduct: false,

  version: null,
  versionError: null,
  versionFetching: false,


  transaction: null,
  updatingError: null,
  updating: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetchingServices: true, errorServices: null,product:null });

// we've successfully logged in
export const success = (state, data) => {
  const { services } = data;
  return state.merge({ fetchingServices: false, errorServices: null, services });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetchingServices: false, errorServices:error, services: null });


// we're attempting to login
export const requestVersion = (state) => state.merge({ versionFetching: true, versionError: null,version:null });

// we've successfully logged in
export const successVersion = (state, data) => {
  const { version } = data;
  return state.merge({ versionFetching: false, versionError: null, version });
};

// we've had a problem logging in
export const failureVersion = (state, { error }) => state.merge({ versionFetching: false, versionError:error, version: null });


// we're attempting to login
export const productrequest = (state) => state.merge({ fetchingproduct: true, errorproduct: null ,product:null});

// we've successfully logged in
export const productsuccess = (state, data) => {
  const { product } = data;
  return state.merge({ fetchingproduct: false, errorproduct: null, product });
};

// we've had a problem logging in
export const productfailure = (state, { error }) => state.merge({ fetchingproduct: false, errorproduct:error, product: null });



// we're attempting to login
export const createtransactionrequest = (state) => state.merge({ updating: true, updatingError: null });

// we've successfully logged in
export const createtransactionsuccess = (state, data) => {
  const { transaction } = data;
  return state.merge({ updating: false, updatingError: null, transaction });
};

// we've had a problem logging in
export const createtransactionfailure = (state, { error }) => state.merge({ updating: false, updatingError:error, transaction: null });

 
// we've logged out
export const Reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_REQUEST]: request,
  [Types.SERVICE_SUCCESS]: success,
  [Types.SERVICE_FAILURE]: failure,

  [Types.VERSION_REQUEST]: requestVersion,
  [Types.VERSION_SUCCESS]: successVersion,
  [Types.VERSION_FAILURE]: failureVersion,

  [Types.HOME_PRODUCT_REQUEST]: productrequest,
  [Types.HOME_PRODUCT_SUCCESS]: productsuccess,
  [Types.HOME_PRODUCT_FAILURE]: productfailure,

  [Types.CREATE_TRANSACTION_REQUEST]: createtransactionrequest,
  [Types.CREATE_TRANSACTION_SUCCESS]: createtransactionsuccess,
  [Types.CREATE_TRANSACTION_FAILURE]: createtransactionfailure,

  [Types.RESET]: Reset,

  
});

/* ------------- Selectors ------------- */
