import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import BusinessActions from './business.reducer';

function* getBusiness(api, action) {
  const { businessId } = action;
  // make the call to the api
  const apiCall = call(api.getBusiness, businessId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessSuccess(response.data));
  } else {
    yield put(BusinessActions.businessFailure(response.data));
  }
}

function* getAllBusinesss(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllBusiness, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessAllSuccess(response.data));
  } else {
    yield put(BusinessActions.businessAllFailure(response.data));
  }
}

function* updateBusiness(api, action) {
  const { business } = action;
  // make the call to the api
  const idIsNotNull = !(business.id === null || business.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateBusiness : api.createBusiness, business);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessUpdateSuccess(response.data));
  } else {
    yield put(BusinessActions.businessUpdateFailure(response.data));
  }
}

function* searchBusinesss(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchBusiness, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BusinessActions.businessSearchSuccess(response.data));
  } else {
    yield put(BusinessActions.businessSearchFailure(response.data));
  }
}
function* deleteBusiness(api, action) {
  const { businessId } = action;
  // make the call to the api
  const apiCall = call(api.deleteBusiness, bookingId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BusinessActions.bookingDeleteSuccess());
  } else {
    yield put(BusinessActions.bookingDeleteFailure(response.data));
  }
}

export default {
  getAllBusinesss,
  getBusiness,
  deleteBusiness,
  searchBusinesss,
  updateBusiness,
};
