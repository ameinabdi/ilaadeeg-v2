import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bookingRequest: ['bookingId'],
  bookingAllRequest: ['options'],
  bookingUpdateRequest: ['booking'],
  bookingSearchRequest: ['query'],
  bookingDeleteRequest: ['bookingId'],

  bookingSuccess: ['booking'],
  bookingAllSuccess: ['bookingList', 'headers'],
  bookingUpdateSuccess: ['booking'],
  bookingSearchSuccess: ['bookingList'],
  bookingDeleteSuccess: [],

  bookingFailure: ['error'],
  bookingAllFailure: ['error'],
  bookingUpdateFailure: ['error'],
  bookingSearchFailure: ['error'],
  bookingDeleteFailure: ['error'],

  bookingReset: [],
});

export const BookingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  booking: { id: undefined },
  bookingList: [],
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
    booking: INITIAL_STATE.booking,
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
  const { booking } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    booking,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { bookingList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    bookingList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { booking } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    booking,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { bookingList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    bookingList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    booking: INITIAL_STATE.booking,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    booking: INITIAL_STATE.booking,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    bookingList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    booking: state.booking,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    booking: state.booking,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    bookingList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOKING_REQUEST]: request,
  [Types.BOOKING_ALL_REQUEST]: allRequest,
  [Types.BOOKING_UPDATE_REQUEST]: updateRequest,
  [Types.BOOKING_SEARCH_REQUEST]: searchRequest,
  [Types.BOOKING_DELETE_REQUEST]: deleteRequest,

  [Types.BOOKING_SUCCESS]: success,
  [Types.BOOKING_ALL_SUCCESS]: allSuccess,
  [Types.BOOKING_UPDATE_SUCCESS]: updateSuccess,
  [Types.BOOKING_SEARCH_SUCCESS]: searchSuccess,
  [Types.BOOKING_DELETE_SUCCESS]: deleteSuccess,

  [Types.BOOKING_FAILURE]: failure,
  [Types.BOOKING_ALL_FAILURE]: allFailure,
  [Types.BOOKING_UPDATE_FAILURE]: updateFailure,
  [Types.BOOKING_SEARCH_FAILURE]: searchFailure,
  [Types.BOOKING_DELETE_FAILURE]: deleteFailure,
  [Types.BOOKING_RESET]: reset,
});
