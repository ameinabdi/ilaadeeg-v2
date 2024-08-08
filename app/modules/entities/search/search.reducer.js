import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchRequest: ['searchId'],
  searchAllRequest: ['options'],
  searchUpdateRequest: ['search'],
  searchSearchRequest: ['query'],
  searchDeleteRequest: ['searchId'],

  searchSuccess: ['search'],
  searchAllSuccess: ['searchList', 'headers'],
  searchUpdateSuccess: ['search'],
  searchSearchSuccess: ['searchList'],
  searchDeleteSuccess: [],

  searchFailure: ['error'],
  searchAllFailure: ['error'],
  searchUpdateFailure: ['error'],
  searchSearchFailure: ['error'],
  searchDeleteFailure: ['error'],
  searchFilterRequest:['filter'],
  clearFilterRequest:[],

  searchReset: [],
});

export const SearchTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  search: { id: undefined },
  searchList: [],
  filter:[],
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
    search: INITIAL_STATE.search,
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
  const { search } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    search,
  });
};


// successful api lookup for single entity
export const searchFilter = (state, action) => {
  const {filter}  = action;
  const oldfilter = state.filter;
  if(oldfilter == null){
    return state.merge({
      filter:[filter]
    });
  }else{
    var index = _.find(oldfilter, {type: filter.type});
    let allfilter = [];

    if(index){
      const newfilter=	oldfilter.map((item, indexs) => {
        return item.type === filter.type  ? filter :  item
      })

      allfilter = [...newfilter]

    }else{
      allfilter = [...oldfilter,filter]
    }
    
    return state.merge({
      filter:allfilter
    });
  }
};

export const clearFilter = (state, action) => {
  return state.merge({
    filter:[]
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { searchList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    searchList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { search } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    search,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { searchList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    searchList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    search: INITIAL_STATE.search,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    search: INITIAL_STATE.search,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    searchList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    search: state.search,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    search: state.search,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    searchList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_ALL_REQUEST]: allRequest,
  [Types.SEARCH_UPDATE_REQUEST]: updateRequest,
  [Types.SEARCH_SEARCH_REQUEST]: searchRequest,
  [Types.SEARCH_DELETE_REQUEST]: deleteRequest,

  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_ALL_SUCCESS]: allSuccess,
  [Types.SEARCH_UPDATE_SUCCESS]: updateSuccess,
  [Types.SEARCH_SEARCH_SUCCESS]: searchSuccess,
  [Types.SEARCH_DELETE_SUCCESS]: deleteSuccess,

  [Types.SEARCH_FILTER_REQUEST]: searchFilter,
  [Types.CLEAR_FILTER_REQUEST]: clearFilter,

  [Types.SEARCH_FAILURE]: failure,
  [Types.SEARCH_ALL_FAILURE]: allFailure,
  [Types.SEARCH_UPDATE_FAILURE]: updateFailure,
  [Types.SEARCH_SEARCH_FAILURE]: searchFailure,
  [Types.SEARCH_DELETE_FAILURE]: deleteFailure,
  [Types.SEARCH_RESET]: reset,
});
