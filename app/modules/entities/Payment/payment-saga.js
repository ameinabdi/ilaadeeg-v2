import { call, put, select } from 'redux-saga/effects'

import PaymentActions from './payment-reducer'


export function* checkOutPayment(api, {payment }) {
    const response = yield call(api.createPayment, payment)
    if(response.ok){
      yield put(PaymentActions.checkOutSuccess(response.data))
    } else {
      yield put(PaymentActions.checkOutFailure(response.data));
    }
    
  }

 export function* PaymentSetup(api, {booking }) {
    const response = yield call(api.paymentSetup, booking)
    if(response.ok){
      yield put(PaymentActions.paymentSetupSuccess(response.data))
    } else {
      yield put(PaymentActions.paymentSetupFailure(response.data));
    }
    
  }
//   {
//     "schemaVersion": "1.0",
//     "timestamp": "2021-10-17 18:00:33.519",
//     "requestId": "123122",
//     "sessionId": "",
//     "responseCode": "2001",
//     "errorCode": "0",
//     "responseMsg": "RCS_SUCCESS",
//     "params": {
//         "state": "APPROVED",
//         "referenceId": "REF1571118031",
//         "transactionId": "20715855",
//         "txAmount": "500.0"
//     }
// }