import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  workerRequest: ['workerId'],
  workerAllRequest: ['options'],
  workerUpdateRequest: ['worker'],
  workerSearchRequest: ['query'],
  workerDeleteRequest: ['workerId'],
  workerCategoryAllRequest: ['options'],

  workerSuccess: ['worker'],
  workerAllSuccess: ['workerList', 'headers'],
  workerCategoryAllSuccess: ['workerCategoryList', 'headers'],

  workerUpdateSuccess: ['worker'],
  workerSearchSuccess: ['workerList'],
  workerDeleteSuccess: [],

  workerFailure: ['error'],
  workerAllFailure: ['error'],
  workerCategoryAllFailure: ['error'],
  workerUpdateFailure: ['error'],
  workerSearchFailure: ['error'],
  workerDeleteFailure: ['error'],

  workerReset: [],
});

export const WorkerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  fetchingCategoryAll: false,
  workerCategoryList: [],
  errorCategoryAll: null,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  worker: { id: undefined },
  workerCategoryList: [],
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
    worker: INITIAL_STATE.worker,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

  // request the data from an api
export const allCategoryRequest = (state) =>
state.merge({
  fetchingCategoryAll: true,
  errorCategoryAll: false,
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
  const { worker } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    worker,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { workerList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    workerList,
  });
};
// successful api lookup for all entities
export const allCategorySuccess = (state, action) => {
  const { workerCategoryList } = action;
  return state.merge({
    fetchingCategoryAll: false,
    errorCategoryAll: null,
    workerCategoryList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { worker } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    worker,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { workerList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    workerList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    worker: INITIAL_STATE.worker,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    worker: INITIAL_STATE.worker,
  });
};
// Something went wrong fetching all entities.
export const allCategoryFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingCategoryAll: false,
    errorCategoryAll: error,
    workerCategoryList: [],
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    workerList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    worker: state.worker,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    worker: state.worker,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    workerList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WORKER_REQUEST]: request,
  [Types.WORKER_ALL_REQUEST]: allRequest,
  [Types.WORKER_UPDATE_REQUEST]: updateRequest,
  [Types.WORKER_SEARCH_REQUEST]: searchRequest,
  [Types.WORKER_DELETE_REQUEST]: deleteRequest,
  [Types.WORKER_CATEGORY_ALL_REQUEST]: allCategoryRequest,
  [Types.WORKER_CATEGORY_ALL_SUCCESS]: allCategorySuccess,
  [Types.WORKER_CATEGORY_ALL_FAILURE]: allCategoryFailure,

  [Types.WORKER_SUCCESS]: success,
  [Types.WORKER_ALL_SUCCESS]: allSuccess,
  [Types.WORKER_UPDATE_SUCCESS]: updateSuccess,
  [Types.WORKER_SEARCH_SUCCESS]: searchSuccess,
  [Types.WORKER_DELETE_SUCCESS]: deleteSuccess,

  [Types.WORKER_FAILURE]: failure,
  [Types.WORKER_ALL_FAILURE]: allFailure,
  [Types.WORKER_UPDATE_FAILURE]: updateFailure,
  [Types.WORKER_SEARCH_FAILURE]: searchFailure,
  [Types.WORKER_DELETE_FAILURE]: deleteFailure,
  [Types.WORKER_RESET]: reset,
});
