import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CustomerAccountActions from './customer-account.reducer';

function* getCustomerAccount(api, action) {
  const {customerAccountId } = action;
  // make the call to the api
  const apiCall = call(api.getCustomerAccount, customerAccountId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerAccountActions.customerAccountSuccess(response.data));
  } else {
    yield put(CustomerAccountActions.customerAccountFailure(response.data));
  }
}

function* getAllCustomerAccounts(api, action) {
  const { id } = action;
  // make the call to the api
  const apiCall = call(api.getAllCustomerAccounts, id);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerAccountActions.customerAccountAllSuccess(response.data?.rows));
  } else {
    yield put(CustomerAccountActions.customerAccountAllFailure(response.data));
  }
}

function* updateCustomerAccounts(api, action) {
  const { customerAccount } = action;
  // make the call to the api
  const idIsNotNull = !(customerAccount.id === null ||customerAccount.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCustomerAccount : api.createCustomerAccount,customerAccount);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerAccountActions.customerAccountUpdateSuccess(response.data));
  } else {
    yield put(CustomerAccountActions.customerAccountUpdateFailure(response.data));
  }
}

function* searchCustomerAccounts(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchCustomerAccounts, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerAccountActions.customerAccountSearchSuccess(response.data));
  } else {
    yield put(CustomerAccountActions.customerAccountSearchFailure(response.data));
  }
}
function* deleteCustomerAccounts(api, action) {
  const {customerAccountId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCustomerAccount, customerAccountId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CustomerAccountActions.customerAccountDeleteSuccess());
  } else {
    yield put(CustomerAccountActions.customerAccountDeleteFailure(response.data));
  }
}

export default {
  getAllCustomerAccounts,
  getCustomerAccount,
  deleteCustomerAccounts,
  searchCustomerAccounts,
  updateCustomerAccounts,
};
