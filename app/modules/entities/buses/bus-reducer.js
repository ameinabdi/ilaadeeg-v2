import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  busRequest: ['id','travelDate'],
  busSuccess: ['bus'],
  busFailure: ['error'],

  busAllRequest: ['options'],
  busAllSuccess: ['buses'],
  busAllFailure: ['error'],
});

export const BusTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  buses: null,
  errorbuses: null,
  fetchingbuses: false,
  bus: null,
  errorbus: null,
  fetchingbus: false,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const requestAll = (state) => state.merge({ fetchingbuses: true, errorbuses: null ,buses: null,});

// we've successfully logged in
export const successAll = (state, data) => {
  const { buses } = data;
  return state.merge({ fetchingbuses: false, errorbuses: null, buses });
};

// we've had a problem logging in
export const failureAll = (state, { error }) => state.merge({ fetchingbuses: false, errorbuses:error, buses: null });

 
// we're attempting to login
export const request = (state) => state.merge({ fetchingbus: true, errorbus: null });

// we've successfully logged in
export const success = (state, data) => {
  const { bus } = data;
  return state.merge({ fetchingbus: false, errorbus: null, bus });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetchingbus: false, errorbus:error, bus: null });

 

// we've logged out
export const Reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BUS_ALL_REQUEST]: requestAll,
  [Types.BUS_ALL_SUCCESS]: successAll,
  [Types.BUS_ALL_FAILURE]: failureAll,

  [Types.BUS_REQUEST]: request,
  [Types.BUS_SUCCESS]: success,
  [Types.BUS_FAILURE]: failure,
  
});
