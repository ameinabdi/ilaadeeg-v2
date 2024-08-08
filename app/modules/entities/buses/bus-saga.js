import { call, put } from 'redux-saga/effects';

import BusActions, { requestAll } from './bus-reducer';

export function* getAllBuses(api, action) {
  const { options } = action;
  // make the call to the api
  const response = yield call(api.getAllbuses, options);
  // success?
  if (response.ok) {
    yield put(BusActions.busAllSuccess(response.data?.rows))
  } else {
    yield put(BusActions.busAllFailure(response.data));
  }
}

export function* getBus(api, action) {
  const { id,travelDate } = action;
  // make the call to the api
  const response = yield call(api.getbus, id,travelDate);
  // success?
  if (response.ok) {
    yield put(BusActions.busSuccess(response.data))
  } else {
    yield put(BusActions.busFailure(response.data));
  }
}
