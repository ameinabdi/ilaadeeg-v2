import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedbackRequest: ['feedbackId'],
  feedbackAllRequest: ['options'],
  feedbackUpdateRequest: ['feedback'],
  feedbackSearchRequest: ['query'],
  feedbackDeleteRequest: ['feedbackId'],

  feedbackSuccess: ['feedback'],
  feedbackAllSuccess: ['feedbackList', 'headers'],
  feedbackUpdateSuccess: ['feedback'],
  feedbackSearchSuccess: ['feedbackList'],
  feedbackDeleteSuccess: [],

  feedbackFailure: ['error'],
  feedbackAllFailure: ['error'],
  feedbackUpdateFailure: ['error'],
  feedbackSearchFailure: ['error'],
  feedbackDeleteFailure: ['error'],

  feedbackReset: [],
});

export const FeedbackTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  feedback: { id: undefined },
  feedbackList: [],
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
    feedback: INITIAL_STATE.feedback,
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
  const { feedback } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    feedback,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { feedbackList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    feedbackList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { feedback } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    feedback,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { feedbackList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    feedbackList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    feedback: INITIAL_STATE.feedback,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    feedback: INITIAL_STATE.feedback,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    feedbackList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    feedback: state.feedback,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    feedback: state.feedback,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    feedbackList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEEDBACK_REQUEST]: request,
  [Types.FEEDBACK_ALL_REQUEST]: allRequest,
  [Types.FEEDBACK_UPDATE_REQUEST]: updateRequest,
  [Types.FEEDBACK_SEARCH_REQUEST]: searchRequest,
  [Types.FEEDBACK_DELETE_REQUEST]: deleteRequest,

  [Types.FEEDBACK_SUCCESS]: success,
  [Types.FEEDBACK_ALL_SUCCESS]: allSuccess,
  [Types.FEEDBACK_UPDATE_SUCCESS]: updateSuccess,
  [Types.FEEDBACK_SEARCH_SUCCESS]: searchSuccess,
  [Types.FEEDBACK_DELETE_SUCCESS]: deleteSuccess,

  [Types.FEEDBACK_FAILURE]: failure,
  [Types.FEEDBACK_ALL_FAILURE]: allFailure,
  [Types.FEEDBACK_UPDATE_FAILURE]: updateFailure,
  [Types.FEEDBACK_SEARCH_FAILURE]: searchFailure,
  [Types.FEEDBACK_DELETE_FAILURE]: deleteFailure,
  [Types.FEEDBACK_RESET]: reset,
});
