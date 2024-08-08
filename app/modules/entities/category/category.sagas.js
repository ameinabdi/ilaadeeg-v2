import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CategoryActions from './category.reducer';

function* getCategory(api, action) {
  const { categoryId } = action;
  // make the call to the api
  const apiCall = call(api.getCategory, categoryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CategoryActions.categorySuccess(response.data));
  } else {
    yield put(CategoryActions.categoryFailure(response.data));
  }
}

function* getAllCategorys(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCategorys, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CategoryActions.categoryAllSuccess(response.data));
  } else {
    yield put(CategoryActions.categoryAllFailure(response.data));
  }
}

function* updateCategory(api, action) {
  const { category } = action;
  // make the call to the api
  const idIsNotNull = !(category.id === null || category.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCategory : api.createCategory, category);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CategoryActions.categoryUpdateSuccess(response.data));
  } else {
    yield put(CategoryActions.categoryUpdateFailure(response.data));
  }
}

function* searchCategorys(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchCategory, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CategoryActions.categorySearchSuccess(response.data));
  } else {
    yield put(CategoryActions.categorySearchFailure(response.data));
  }
}
function* deleteCategory(api, action) {
  const { categoryId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCategory, bookingId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CategoryActions.bookingDeleteSuccess());
  } else {
    yield put(CategoryActions.bookingDeleteFailure(response.data));
  }
}

export default {
  getAllCategorys,
  getCategory,
  deleteCategory,
  searchCategorys,
  updateCategory,
};
