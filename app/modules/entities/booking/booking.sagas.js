import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import BookingActions from './booking.reducer';

function* getBooking(api, action) {
  const { bookingId } = action;
  // make the call to the api
  const apiCall = call(api.getBooking, bookingId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BookingActions.bookingSuccess(response.data));
  } else {
    yield put(BookingActions.bookingFailure(response.data));
  }
}

function* getAllBookings(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllBookings, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BookingActions.bookingAllSuccess(response.data?.rows));
  } else {
    yield put(BookingActions.bookingAllFailure(response.data));
  }
}

function* updateBooking(api, action) {
  const { booking } = action;
  // make the call to the api
  const idIsNotNull = !(booking.id === null || booking.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateBooking : api.createBooking, booking);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BookingActions.bookingUpdateSuccess(response.data));
  } else {
    yield put(BookingActions.bookingUpdateFailure(response.data));
  }
}

function* searchBookings(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchBookings, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BookingActions.bookingSearchSuccess(response.data));
  } else {
    yield put(BookingActions.bookingSearchFailure(response.data));
  }
}
function* deleteBooking(api, action) {
  const { bookingId } = action;
  // make the call to the api
  const apiCall = call(api.deleteBooking, bookingId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BookingActions.bookingDeleteSuccess());
  } else {
    yield put(BookingActions.bookingDeleteFailure(response.data));
  }
}

export default {
  getAllBookings,
  getBooking,
  deleteBooking,
  searchBookings,
  updateBooking,
};
