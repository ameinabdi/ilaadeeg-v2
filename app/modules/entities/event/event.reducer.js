import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventRequest: ['eventId'],
  eventAllRequest: ['options'],
  eventUpdateRequest: ['event'],
  eventDeleteRequest: ['eventId'],
  popularEventRequest:['options'],
  eventSetupRequest: ['options'],

  eventSuccess: ['event'],
  eventAllSuccess: ['events', 'headers'],
  popularEventSuccess:['data'],
  eventSetupSuccess:['eventSetup'],

  eventUpdateSuccess: ['event'],
  eventDeleteSuccess: [],

  eventFailure: ['error'],
  eventAllFailure: ['error'],
  eventUpdateFailure: ['error'],
  eventDeleteFailure: ['error'],
  popularEventFailure:['error'],
  eventSetupFailure: ['error'],

  uploadEventCoverRequest:['events', 'picture'],
  uploadEventCoverSuccess:['data'],
  uploadEventCoverFailure:['error'],

  eventReset: [],
})

export const EventTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  fetchingPopular: null,
  PopularEvents: null,
  errorPopular: null,
  updating: null,
  deleting: null,
  event: null,
  eventCover:null,
  eventCoverfetching:null,
  eventCoverError:null,
  events: [],

  eventSetup: [],
  fetchingEventSetup: null,
  errorEventSetup: null,

  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    event: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })

// request the data from an api
export const setuprequest = (state) =>
  state.merge({
    fetchingEventSetup: true,
    errorEventSetup: null,
  })
// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })


// request the data from an api
export const uploadeventcoverrequest = (state) =>
  state.merge({
    eventCover:null,
    eventCoverfetching:true,
    eventCoverError:null,
  })

// successful api lookup for single entity
export const uploadeventcoversuccess = (state, action) => {
  const { data } = action
  return state.merge({
    eventCover:data,
    eventCoverfetching:false,
    eventCoverError:null,
  })
}
// Something went wrong fetching a single entity.
export const uploadeventcoverfailure = (state, action) => {
  const { error } = action
  return state.merge({
    eventCover:null,
    eventCoverfetching:false,
    eventCoverError:error,
  })
}

// request the data from an api
export const populareventrequest = (state) =>
  state.merge({
    fetchingPopular: true,
    PopularEvents: null,
    errorPopular: null,
  })

// successful api lookup for single entity
export const populareventsuccess = (state, action) => {
  const { data } = action
  return state.merge({
    fetchingPopular: false,
    PopularEvents: data,
    errorPopular: null,
  })
}
// Something went wrong fetching a single entity.
export const populareventfailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingPopular: false,
    PopularEvents: null,
    errorPopular: error,
  })
}


// successful api lookup for single entity
export const success = (state, action) => {
  const { event } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    event,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { events, headers } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    events:  events,
  })
}

// successful api lookup for all entities
export const setupsuccess = (state, action) => {
  const { eventSetup } = action
  return state.merge({
    fetchingEventSetup: false,
    errorEventSetup: null,
    eventSetup
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { event } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    event,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    event: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    event: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    events: [],
  })
}

// Something went wrong fetching all entities.
export const setupfailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingEventSetup: false,
    errorEventSetup: error,
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    event: state.event,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    event: state.event,
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_REQUEST]: request,
  [Types.EVENT_ALL_REQUEST]: allRequest,
  [Types.EVENT_UPDATE_REQUEST]: updateRequest,
  [Types.EVENT_DELETE_REQUEST]: deleteRequest,
  
  [Types.EVENT_SETUP_REQUEST]: setuprequest,
  [Types.EVENT_SETUP_SUCCESS]: setupsuccess,
  [Types.EVENT_SETUP_FAILURE]: setupfailure,

  [Types.UPLOAD_EVENT_COVER_REQUEST]: uploadeventcoverrequest,
  [Types.UPLOAD_EVENT_COVER_SUCCESS]: uploadeventcoversuccess,
  [Types.UPLOAD_EVENT_COVER_FAILURE]: uploadeventcoverfailure,

  [Types.POPULAR_EVENT_REQUEST]: populareventrequest,
  [Types.POPULAR_EVENT_SUCCESS]: populareventsuccess,
  [Types.POPULAR_EVENT_FAILURE]: populareventfailure,

  [Types.EVENT_SUCCESS]: success,
  [Types.EVENT_ALL_SUCCESS]: allSuccess,
  [Types.EVENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.EVENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.EVENT_FAILURE]: failure,
  [Types.EVENT_ALL_FAILURE]: allFailure,
  [Types.EVENT_UPDATE_FAILURE]: updateFailure,
  [Types.EVENT_DELETE_FAILURE]: deleteFailure,
  [Types.EVENT_RESET]: reset,
})
