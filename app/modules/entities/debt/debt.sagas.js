import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import DebtActions from './debt.reducer';

function* getDebt(api, action) {
  const { debtId } = action;
  // make the call to the api
  const apiCall = call(api.getDebt, debtId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtSuccess(response.data));
  } else {
    yield put(DebtActions.debtFailure(response.data));
  }
}

function* getAllDebts(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllDebts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtAllSuccess(response.data));
  } else {
    yield put(DebtActions.debtAllFailure(response.data));
  }
}

function* updateDebt(api, action) {
  const { debt } = action;
  // make the call to the api
  const idIsNotNull = !(debt.id === null || debt.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateDebt : api.createDebt, {data:debt});
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtUpdateSuccess(response.data));
  } else {
    yield put(DebtActions.debtUpdateFailure(response.data));
  }
}

function* updateDebtStatus(api, action) {
  const { debt } = action;
  // make the call to the api
  const apiCall = call(api.updateStatusDebt ,debt.id, {data:debt});
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtUpdateStatusSuccess(response.data));
  } else {
    yield put(DebtActions.debtUpdateStatusFailure(response.data));
  }
}

function* updateDebtStatusHistory(api, action) {
  const { debt } = action;
  // make the call to the api
  const apiCall = call(api.updateStatusDebtHistory ,debt.id, {data:debt});
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtUpdateStatusHistorySuccess(response.data));
  } else {
    yield put(DebtActions.debtUpdateStatusHistoryFailure(response.data));
  }
}

function* updateDebtHistory(api, action) {
  const { debtHistory } = action;
  // make the call to the api
  const idIsNotNull = !(debtHistory.id === null || debtHistory.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateHistoryDebt : api.createHistoryDebt, {data:debtHistory});
  const response = yield call(callApi, apiCall);
  // success?
  if (response.ok) {
    yield put(DebtActions.debtUpdateHistorySuccess(response.data));
  } else {
    yield put(DebtActions.debtUpdateHistoryFailure(response.data));
  }
}

function* searchDebts(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchDebts, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtSearchSuccess(response.data));
  } else {
    yield put(DebtActions.debtSearchFailure(response.data));
  }
}
function* deleteDebt(api, action) {
  const { debtId } = action;
  // make the call to the api
  const apiCall = call(api.deleteDebt, debtId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtDeleteSuccess());
  } else {
    yield put(DebtActions.debtDeleteFailure(response.data));
  }
}

function* deleteHistoryDebt(api, action) {
  const { debtHistoryId } = action;
  // make the call to the api
  const apiCall = call(api.deleteHistoryDebt, debtHistoryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DebtActions.debtDeleteHistorySuccess());
  } else {
    yield put(DebtActions.debtDeleteHistoryFailure(response.data));
  }
}

export default {
  getAllDebts,
  getDebt,
  deleteDebt,
  updateDebtStatus,
  searchDebts,
  updateDebt,
  updateDebtHistory,
  deleteHistoryDebt,
  updateDebtStatusHistory
};
