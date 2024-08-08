import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  transactionRequest: ['id','travelDate'],
  transactionSuccess: ['transaction'],
  transactionFailure: ['error'],

  transactionAllRequest: ['options'],
  transactionAllSuccess: ['transactions'],
  transactionAllFailure: ['error'],
});

export const TransactionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transactions: [],
  errortransactions: null,
  fetchingtransactions: false,
  transaction: null,
  errortransaction: null,
  fetchingtransaction: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const requestAll = (state) => state.merge({ fetchingtransactions: true, errortransactions: null ,});

// we've successfully logged in
export const successAll = (state, data) => {
  const { transactions } = data;
  return state.merge({ fetchingtransactions: false, errortransactions: null, transactions });
};

// we've had a problem logging in
export const failureAll = (state, { error }) => state.merge({ fetchingtransactions: false, errortransactions:error, transactions: null });

 
// we're attempting to login
export const request = (state) => state.merge({ fetchingtransaction: true, errortransaction: null });

// we've successfully logged in
export const success = (state, data) => {
  const { transaction } = data;
  return state.merge({ fetchingtransaction: false, errortransaction: null, transaction });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetchingtransaction: false, errortransaction:error, transaction: null });

 

// we've logged out
export const Reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSACTION_ALL_REQUEST]: requestAll,
  [Types.TRANSACTION_ALL_SUCCESS]: successAll,
  [Types.TRANSACTION_ALL_FAILURE]: failureAll,

  [Types.TRANSACTION_REQUEST]: request,
  [Types.TRANSACTION_SUCCESS]: success,
  [Types.TRANSACTION_FAILURE]: failure,
  
});
