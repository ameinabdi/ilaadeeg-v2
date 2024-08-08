import { call, put } from 'redux-saga/effects';

import TransactionActions from './transaction-reducer';

export function* getAllTransactions(api, action) {
  const { options } = action;
  // make the call to the api
  const response = yield call(api.getAllTransaction, options);
  // success?
  if (response.ok) {
    yield put(TransactionActions.transactionAllSuccess(response.data?.rows))
  } else {
    yield put(TransactionActions.transactionAllFailure(response.data));
  }
}

export function* getTransaction(api, action) {
  const { id,travelDate } = action;
  // make the call to the api
  const response = yield call(api.getTransaction, id,travelDate);
  // success?
  if (response.ok) {
    yield put(TransactionActions.transactionSuccess(response.data))
  } else {
    yield put(TransactionActions.transactionFailure(response.data));
  }
}
