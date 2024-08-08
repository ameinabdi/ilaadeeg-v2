import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import FeedbackActions from './feedback.reducer';

function* getFeedback(api, action) {
  const { feedbackId } = action;
  // make the call to the api
  const apiCall = call(api.getFeedback, feedbackId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FeedbackActions.feedbackSuccess(response.data));
  } else {
    yield put(FeedbackActions.feedbackFailure(response.data));
  }
}

function* getAllFeedbacks(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllFeedbacks, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FeedbackActions.feedbackAllSuccess(response.data?.rows));
  } else {
    yield put(FeedbackActions.feedbackAllFailure(response.data));
  }
}

function* updateFeedback(api, action) {
  const { feedback } = action;
  // make the call to the api
  const idIsNotNull = !(feedback.id === null || feedback.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFeedback : api.createFeedback, feedback);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FeedbackActions.feedbackUpdateSuccess(response.data));
  } else {
    yield put(FeedbackActions.feedbackUpdateFailure(response.data));
  }
}

function* searchFeedbacks(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchFeedbacks, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FeedbackActions.feedbackSearchSuccess(response.data));
  } else {
    yield put(FeedbackActions.feedbackSearchFailure(response.data));
  }
}
function* deleteFeedback(api, action) {
  const { feedbackId } = action;
  // make the call to the api
  const apiCall = call(api.deleteFeedback, feedbackId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FeedbackActions.feedbackDeleteSuccess());
  } else {
    yield put(FeedbackActions.feedbackDeleteFailure(response.data));
  }
}

export default {
  getAllFeedbacks,
  getFeedback,
  deleteFeedback,
  searchFeedbacks,
  updateFeedback,
};
