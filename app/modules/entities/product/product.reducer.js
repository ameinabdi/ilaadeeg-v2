import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: ['productId'],
  productAllRequest: ['options'],
  productUpdateRequest: ['product'],
  productSearchRequest: ['query'],
  productDeleteRequest: ['productId'],
  productSetupRequest: ['options'],
  galleryStore:['gallery'],
  galleryReset:[''],

  productSuccess: ['product'],
  productAllSuccess: ['productList', 'headers'],
  productUpdateSuccess: ['product'],
  productSearchSuccess: ['productList'],
  productDeleteSuccess: [],
  productSetupSuccess:['productSetup'],

  productFailure: ['error'],
  productAllFailure: ['error'],
  productUpdateFailure: ['error'],
  productSearchFailure: ['error'],
  productDeleteFailure: ['error'],
  productSetupFailure: ['error'],

  uploadRequest: ['gallery','image'],
  uploadSuccess: ['gallery'],
  uploadFailure: ['error'],

  productSoldRequest: ['product'],
  productSoldSuccess: ['product'],
  productSoldFailure: ['error'],

  reportRequest: ['report' ],
  reportSuccess: ['data'],
  reportFailure: ['error'],

  productReset: [],
});

export const ProductTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  searching: false,
  deleting: false,
  updateSuccess: false,
  product: { id: undefined },
  productList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,

  productSetup: null,
  fetchingProductSetup: null,
  errorProductSetup: null,
  gallery:null,

  updloading: false,
  errorUploading: null,
  updloadSuccess: false,

  reporting: false,
  errorReporting: null,
  reportingSuccess: false,
});

/* ------------- Reducers ------------- */

export const reportrequest = (state) =>
  state.merge({
    reporting: true,
    errorReporting: null,
    reportingSuccess: false
  });

  export const reportsuccess = (state, action) => {
    const { gallery } = action;
    return state.merge({
      reporting: false,
      errorReporting: null,
      reportingSuccess: true,
    });
  };

  export const reportfailure = (state, action) => {
    const { error } = action;
    return state.merge({
      reporting: false,
      errorReporting: error,
      reportingSuccess: false,
    });
  };

  export const soldRequest = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: null,
  });

  export const soldSuccess = (state, action) => {
    const { product } = action;
    return state.merge({
      fetchingOne: false,
      errorOne: null,
      product,
    });
  };

  export const soldFailure = (state, action) => {
    const { error } = action;
    return state.merge({
      reporting: false,
      errorOne: error,
      product: null,
    });
  };

export const uploadrequest = (state) =>
  state.merge({
    updloading: true,
    errorUploading: null,
    updloadSuccess: false
  });

  export const uploadsuccess = (state, action) => {
    const { gallery } = action;
    return state.merge({
      updloading: false,
      errorUploading: null,
      updloadSuccess: true,
    });
  };

  export const uploadfailure = (state, action) => {
    const { error } = action;
    return state.merge({
      updloading: false,
      errorUploading: error,
      updloadSuccess: false,
    });
  };
// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    product: INITIAL_STATE.product,
  });
export const galleryStore = (state,action) =>{
  const { gallery } = action

  return state.merge({
    gallery
  });
}
  
export const galleryReset = (state) =>{
  return state.merge({
    gallery:[],
    updloading: false,
    errorUploading: null,
  });
}

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

// request the data from an api
export const setuprequest = (state) =>
state.merge({
  fetchingProductSetup: true,
  errorProductSetup: null,
  productSetup:null,
  updateSuccess:null
})


// successful api lookup for all entities
export const setupsuccess = (state, action) => {
  const { productSetup } = action
  return state.merge({
    fetchingProductSetup: false,
    errorProductSetup: null,
    productSetup
  })
}


// Something went wrong fetching all entities.
export const setupfailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingProductSetup: false,
    errorProductSetup: error,
    productSetup:null

  })
}

// successful api lookup for single entity
export const success = (state, action) => {
  const { product } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    product,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    productList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { product } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    product,
  });
};
// successful api search
export const searchSuccess = (state, action) => {
  const { productList } = action;
  return state.merge({
    searching: false,
    errorSearching: null,
    productList,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    product: INITIAL_STATE.product,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    product: INITIAL_STATE.product,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    product: state.product,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    product: state.product,
  });
};
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    searching: false,
    errorSearching: error,
    productList: [],
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_ALL_REQUEST]: allRequest,
  [Types.PRODUCT_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCT_SEARCH_REQUEST]: searchRequest,
  [Types.PRODUCT_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCT_SOLD_REQUEST]: soldRequest,
  [Types.PRODUCT_SOLD_SUCCESS]: soldSuccess,
  [Types.PRODUCT_SOLD_FAILURE]: soldFailure,
   
  [Types.PRODUCT_SETUP_REQUEST]: setuprequest,
  [Types.PRODUCT_SETUP_SUCCESS]: setupsuccess,
  [Types.PRODUCT_SETUP_FAILURE]: setupfailure,

  [Types.UPLOAD_REQUEST]: uploadrequest,
  [Types.UPLOAD_SUCCESS]: uploadsuccess,
  [Types.UPLOAD_FAILURE]: uploadfailure,

  [Types.REPORT_REQUEST]: reportrequest,
  [Types.REPORT_SUCCESS]: reportsuccess,
  [Types.REPORT_FAILURE]: reportfailure,

  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCT_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_SEARCH_SUCCESS]: searchSuccess,
  [Types.PRODUCT_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCT_FAILURE]: failure,
  [Types.PRODUCT_ALL_FAILURE]: allFailure,
  [Types.PRODUCT_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCT_SEARCH_FAILURE]: searchFailure,
  [Types.PRODUCT_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCT_RESET]: reset,
  [Types.GALLERY_STORE]: galleryStore,
  [Types.GALLERY_RESET]: galleryReset,

});
