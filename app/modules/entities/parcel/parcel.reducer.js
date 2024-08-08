import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  parcelRequest: ['serialNumber'],
  parcelSuccess: ['parcel'],
  parcelFailure: ['error'],

  parcelReset: [],
});

export const ParcelTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  parcel: null,
  error: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    parcel: INITIAL_STATE.parcel,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { parcel } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    parcel,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    parcel: INITIAL_STATE.parcel,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARCEL_REQUEST]: request,
  [Types.PARCEL_SUCCESS]: success,
  [Types.PARCEL_FAILURE]: failure,
  [Types.PARCEL_RESET]: reset,
});
