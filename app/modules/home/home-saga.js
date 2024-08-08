import { call, put } from 'redux-saga/effects';

import HomeActions from './home-reducer';

export function* Services(api, action) {
  const { options } = action;
  // make the call to the api
  const response = yield call(api.getServices, options);
  // success?
  if (response.ok) {
    yield put(HomeActions.serviceSuccess(response.data))
  } else {
    yield put(HomeActions.serviceFailure(response.data));
  }
}


export function* getProduct(api, action) {
  const { product } = action;
  // make the call to the api
  const response = yield call(api.getProduct, product);
  // success?
  if (response.ok) {
    yield put(HomeActions.homeProductSuccess(response.data))
  } else {
    yield put(HomeActions.homeProductFailure(response.data));
  }
}
export function* getVersion(api, action) {
  const { option } = action;
  // make the call to the api
  const response = yield call(api.getVersion, option);
  // success?
  if (response.ok) {
    yield put(HomeActions.versionSuccess(response.data))
  } else {
    yield put(HomeActions.versionFailure(response.data));
  }
}
export function* createTransaction(api, action) {
  const { transaction } = action;
  // make the call to the api
  const response = yield call(api.createTransaction, transaction);
  // success?
  if (response.ok) {
    yield put(HomeActions.createTransactionSuccess(response.data))
  } else {
    yield put(HomeActions.createTransactionFailure(response.data));
  }
}
