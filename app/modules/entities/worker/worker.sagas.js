import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import WorkerActions from './worker.reducer';

function* getWorker(api, action) {
  const { workerId } = action;
  // make the call to the api
  const apiCall = call(api.getWorker, workerId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(WorkerActions.workerSuccess(response.data));
  } else {
    yield put(WorkerActions.workerFailure(response.data));
  }
}

function* getAllWorkerCategories(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllWorkerCategories, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(WorkerActions.workerCategoryAllSuccess(response.data));
  } else {
    yield put(WorkerActions.workerCategoryAllFailure(response.data));
  }
}


function* getAllWorkers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllWorkers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(WorkerActions.workerAllSuccess(response.data?.rows));
  } else {
    yield put(WorkerActions.workerAllFailure(response.data));
  }
}

function* updateWorker(api, action) {
  const { worker } = action;
  // make the call to the api
  const idIsNotNull = !(worker.id === null || worker.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateWorker : api.createWorker, worker);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(WorkerActions.workerUpdateSuccess(response.data));
  } else {
    yield put(WorkerActions.workerUpdateFailure(response.data));
  }
}

function* searchWorkers(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchWorkers, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(WorkerActions.workerSearchSuccess(response.data));
  } else {
    yield put(WorkerActions.workerSearchFailure(response.data));
  }
}
function* deleteWorker(api, action) {
  const { workerId } = action;
  // make the call to the api
  const apiCall = call(api.deleteWorker, workerId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(WorkerActions.workerDeleteSuccess());
  } else {
    yield put(WorkerActions.workerDeleteFailure(response.data));
  }
}

export default {
  getAllWorkers,
  getAllWorkerCategories,
  getWorker,
  deleteWorker,
  searchWorkers,
  updateWorker,
};
