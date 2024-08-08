import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import SearchActions from './search.reducer';



function* getAllSearchs(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllSearchs, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(SearchActions.searchAllSuccess(response.data?.rows));
  } else {
    yield put(SearchActions.searchAllFailure(response.data));
  }
}


function* searchSearchs(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchSearchs, query);
  const response = yield call(callApi, apiCall);
  // success?
  if (response.ok) {
    yield put(SearchActions.searchSearchSuccess(response.data?.rows));
  } else {
    yield put(SearchActions.searchSearchFailure(response.data));
  }
}

export default {
  getAllSearchs,
  searchSearchs,
};
