import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: [],
  accountSuccess: ['account'],
  accountFailure: ['error'],
  accountUpdateRequest: ['account'],
  accountUpdateSuccess: [],
  accountUpdateFailure: ['error'],
  setupPinRequest: ['data'],
  setupPinSuccess: ['sucess'],
  setupPinFailure: ['error'],
  languageRequest:['language'], 
  accountReset: [],
});

export const AccountTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  error: null,
  fetching: false,
  updating: false,
  language:'en',
  setupPinfetching: false,
  setupPinerror: null,
  setupPinsuccess: null,
});

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state, data) => {
  const { account } = data;
  return state.merge({ fetching: false, error: null, account });
};

// we've had a problem getting the account
export const failure = (state, { error }) => state.merge({ fetching: false, updating: false, account: null, error });

// we're attempting to updating account settings
export const updateRequest = (state) => state.merge({ updating: true });

// we've successfully updated the account settings
export const updateSuccess = (state) => state.merge({ error: null, updating: false });

// we've had a problem updating the account settings
export const updateFailure = (state, { error }) => state.merge({ updating: false, error });

// we're attempting to pin
export const setUpPinrequest = (state) => state.merge({ setupPinfetching: true, setupPinerror: null });

// we've successfully logged in
export const setUpPinsuccess = (state, data) => {
  const { success } = data;
  return state.merge({ setupPinfetching: false, setupPinerror: null, setupPinsuccess: success });
};

// we've had a problem logging in
export const setUpPinfailure = (state, { error }) => state.merge({ setupPinfetching: false, error, setupPinsuccess: null });

export const language =(state,data) =>{
  const { language } = data;
  return state.merge({language});
};

// reset the account reducer
export const reset = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACCOUNT_UPDATE_FAILURE]: updateFailure,

  [Types.SETUP_PIN_REQUEST]: setUpPinrequest,
  [Types.SETUP_PIN_SUCCESS]: setUpPinsuccess,
  [Types.SETUP_PIN_FAILURE]: setUpPinfailure,

  [Types.ACCOUNT_RESET]: reset,
  [Types.LANGUAGE_REQUEST]: language,

});

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = (accountState) => accountState.account !== null;

export const getLogin = (accountState) => (accountState.account !== null ? accountState.account.login : 'anonymoususer');
