import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ParcelActions from './parcel.reducer';

export function* getParcel(api, action) {
  const { serialNumber } = action;
  // make the call to the api
  const apiCall = call(api.getParcel, serialNumber);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ParcelActions.parcelSuccess(response.data));
  } else {
    yield put(ParcelActions.parcelFailure(response.data));
  }
}


