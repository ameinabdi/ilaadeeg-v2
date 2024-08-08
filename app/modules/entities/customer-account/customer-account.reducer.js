import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  customerAccountRequest: ['customerAccountId'],
  customerAccountAllRequest: ['id'],
  customerAccountUpdateRequest: ['customerAccount'],
  customerAccountSearchRequest: ['query'],
  customerAccountDeleteRequest: ['customerAccountId'],

  customerAccountSuccess: ['customerAccount'],
  customerAccountAllSuccess: ['customerAccountList', 'headers'],
  customerAccountUpdateSuccess: ['customerAccount'],
  customerAccountSearchSuccess: ['customerAccountList'],
  customerAccountDeleteSuccess: [],

  customerAccountFailure: ['error'],
  customerAccountAllFailure: ['error'],
  customerAccountUpdateFailure: ['error'],
  customerAccountSearchFailure: ['error'],
  customerAccountDeleteFailure: ['error'],

  customerAccountReset: [],
});

export const CustomerAccountTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  customerAccount: { id: undefined },
  customerAccountList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    customerAccount: INITIAL_STATE.customerAccount,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { customerAccount } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    customerAccount,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { customerAccountList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    customerAccountList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { customerAccount } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    customerAccount,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { customerAccountList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    customerAccountList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    customerAccount: INITIAL_STATE.customerAccount,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    customerAccount: INITIAL_STATE.customerAccount,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    customerAccountList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    customerAccount: state.customerAccount,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    customerAccount: state.customerAccount,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    customerAccountList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CUSTOMER_ACCOUNT_REQUEST]: request,
  [Types.CUSTOMER_ACCOUNT_ALL_REQUEST]: allRequest,
  [Types.CUSTOMER_ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.CUSTOMER_ACCOUNT_SEARCH_REQUEST]: searchRequest,
  [Types.CUSTOMER_ACCOUNT_DELETE_REQUEST]: deleteRequest,

  [Types.CUSTOMER_ACCOUNT_SUCCESS]: success,
  [Types.CUSTOMER_ACCOUNT_ALL_SUCCESS]: allSuccess,
  [Types.CUSTOMER_ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.CUSTOMER_ACCOUNT_SEARCH_SUCCESS]: searchSuccess,
  [Types.CUSTOMER_ACCOUNT_DELETE_SUCCESS]: deleteSuccess,

  [Types.CUSTOMER_ACCOUNT_FAILURE]: failure,
  [Types.CUSTOMER_ACCOUNT_ALL_FAILURE]: allFailure,
  [Types.CUSTOMER_ACCOUNT_UPDATE_FAILURE]: updateFailure,
  [Types.CUSTOMER_ACCOUNT_SEARCH_FAILURE]: searchFailure,
  [Types.CUSTOMER_ACCOUNT_DELETE_FAILURE]: deleteFailure,
  [Types.CUSTOMER_ACCOUNT_RESET]: reset,
});
