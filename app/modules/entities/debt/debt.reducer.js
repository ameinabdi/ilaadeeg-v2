import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
 
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
 debtRequest: ['debtId'],
 debtAllRequest: ['options'],
 debtUpdateRequest: ['debt'],
 debtUpdateHistoryRequest: ['debtHistory'],
 debtSearchRequest: ['query'],
 debtDeleteRequest: ['debtId'],
 debtDeleteHistoryRequest:['debtHistoryId'],

 debtSuccess: ['debt'],
 debtAllSuccess: ['debtList', 'headers'],
 debtUpdateSuccess: ['debt'],
 debtUpdateHistorySuccess: ['debt'],
 debtSearchSuccess: ['debtList'],
 debtDeleteSuccess: [],
 debtDeleteHistorySuccess: [],

 debtFailure: ['error'],
 debtAllFailure: ['error'],
 debtUpdateFailure: ['error'],
 debtUpdateHistoryFailure: ['error'],
 debtSearchFailure: ['error'],
 debtDeleteFailure: ['error'],
 debtDeleteHistoryFailure: ['error'],

 debtUpdateStatusRequest:['debt'],
 debtUpdateStatusSuccess:['debtStatus'],
 debtUpdateStatusFailure:['error'],

 debtUpdateStatusHistoryRequest:['debt'],
 debtUpdateStatusHistorySuccess:['debtStatusHistory'],
 debtUpdateStatusHistoryFailure:['error'],
 
 debtReset: [],
});

export const DebtTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  debt: { id: undefined },
  debtList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
  updatingHistory: false,
  updateHistorySuccess: false,
  errorUpdatingHistory: null,
  debtHistory:null,
  deletingHistory: false,
  errorDeletingHistory: null,
  deleteHistorySuccess: false,
  deleteSuccess:true,

  fetchingStatus:false,
  debtStatus:null,
  errorStatus:false,
  
  fetchingStatusHistory:false,
  debtStatusHistory:null,
  errorStatusHistory:false
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    debt: INITIAL_STATE.debt,
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
    deleteSuccess:false

  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { debt } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    debt,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { debtList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    debtList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { debt } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    debt,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { debtList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    debtList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    deleteSuccess:true
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    debt: INITIAL_STATE.debt,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    debtList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    debt: state.debt,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    deleteSuccess:false

  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    debtList: [],
  });
};

// request to update from an api
export const updateHistoryRequest = (state) =>
  state.merge({
    updatingHistory: true,
    updateHistorySuccess: false,
    errorUpdatingHistory: null,
  });
// successful api update
export const updateHistorySuccess = (state, action) => {
  const { debt } = action;
  return state.merge({
    debtHistory:debt,
    updatingHistory: false,
    updateHistorySuccess: true,
    errorUpdatingHistory: null,
  });
};
// Something went wrong updating.
export const updateHistoryFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    debtHistory:state.debtHistory,
    updatingHistory: false,
    updateHistorySuccess: false,
    errorUpdatingHistory: error,
  });
};


// request to update from an api
export const updateStatusRequest = (state) =>
  state.merge({
    fetchingStatus:true,
  debtStatus:null,
  errorStatus:false
  });
// successful api update
export const updateStatusSuccess = (state, action) => {
  const { debtStatus } = action;
  return state.merge({
    fetchingStatus:false,
  debtStatus,
  errorStatus:false
  });
};
// Something went wrong updating.
export const updateStatusFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingStatus:false,
    debtStatus:null,
    errorStatus:error
  });
};

// request to update from an api
export const updateStatusHistoryRequest = (state) =>
  state.merge({
    fetchingStatusHistory:true,
  debtStatusHistory:null,
  errorStatusHistory:false
  });
// successful api update
export const updateStatusHistorySuccess = (state, action) => {
  const { debtStatusHistory } = action;
  return state.merge({
    fetchingStatusHistory:false,
  debtStatusHistory,
  errorStatusHistory:false
  });
};
// Something went wrong updating.
export const updateStatusHistoryFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingStatusHistory:false,
    debtStatusHistory:null,
    errorStatusHistory:error
  });
};


export const deleteHistoryRequest = (state) =>
  state.merge({
    deletingHistory: true,
    deleteHistorySuccess:false
  });
// successful api delete
export const deleteHistorySuccess = (state) => {
  return state.merge({
    deletingHistory: false,
    errorDeletingHistory: null,
    deleteHistorySuccess:true
  });
};
export const deleteHistoryFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deletingHistory: false,
    errorDeletingHistory: error,
    deleteHistorySuccess:false

  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEBT_REQUEST]: request,
  [Types.DEBT_ALL_REQUEST]: allRequest,
  [Types.DEBT_UPDATE_REQUEST]: updateRequest,
  [Types.DEBT_SEARCH_REQUEST]: searchRequest,
  [Types.DEBT_DELETE_REQUEST]: deleteRequest,

  [Types.DEBT_UPDATE_HISTORY_REQUEST]: updateHistoryRequest,
  [Types.DEBT_UPDATE_HISTORY_SUCCESS]: updateHistorySuccess,
  [Types.DEBT_UPDATE_HISTORY_FAILURE]: updateHistoryFailure,

  [Types.DEBT_DELETE_HISTORY_REQUEST]: deleteHistoryRequest,
  [Types.DEBT_DELETE_HISTORY_SUCCESS]: deleteHistorySuccess,
  [Types.DEBT_DELETE_HISTORY_FAILURE]: deleteHistoryFailure,

  [Types.DEBT_UPDATE_STATUS_REQUEST]: updateStatusRequest,
  [Types.DEBT_UPDATE_STATUS_SUCCESS]: updateStatusSuccess,
  [Types.DEBT_UPDATE_STATUS_FAILURE]: updateStatusFailure,

  [Types.DEBT_UPDATE_STATUS_HISTORY_REQUEST]: updateStatusHistoryRequest,
  [Types.DEBT_UPDATE_STATUS_HISTORY_SUCCESS]: updateStatusHistorySuccess,
  [Types.DEBT_UPDATE_STATUS_HISTORY_FAILURE]: updateStatusHistoryFailure,

  [Types.DEBT_SUCCESS]: success,
  [Types.DEBT_ALL_SUCCESS]: allSuccess,
  [Types.DEBT_UPDATE_SUCCESS]: updateSuccess,
  [Types.DEBT_SEARCH_SUCCESS]: searchSuccess,
  [Types.DEBT_DELETE_SUCCESS]: deleteSuccess,

  [Types.DEBT_FAILURE]: failure,
  [Types.DEBT_ALL_FAILURE]: allFailure,
  [Types.DEBT_UPDATE_FAILURE]: updateFailure,
  [Types.DEBT_SEARCH_FAILURE]: searchFailure,
  [Types.DEBT_DELETE_FAILURE]: deleteFailure,
  [Types.DEBT_RESET]: reset,
});
