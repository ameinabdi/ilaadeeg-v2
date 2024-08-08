import { call, put } from 'redux-saga/effects'

import ForgotPasswordActions from './forgot-password.reducer'
import LoginActions from './../../login/login.reducer'
import AccountActions from '../../../shared/reducers/account.reducer'

// attempts to request a password reset
export function* forgotPassword(api, { phoneNumber }) {
  const response = yield call(api.sendPasswordReset, phoneNumber)
  console.log('dattt', response)
  // success?
  if (response.ok) {
    yield put(ForgotPasswordActions.forgotPasswordSuccess(response.data,phoneNumber))
  } else {
    yield put(
      ForgotPasswordActions.forgotPasswordFailure((response.data && response.data.title) || 'Something when wrong resetting your password'),
    )
  }
}


export function* verificationPasswordReset(api, { token }) {
  const object = {
    code:token
  }
const response = yield call(api.verification, object)
// success?
if (response.ok) {
  yield put(ForgotPasswordActions.verificationSuccessPasswordReset(response.data,token))
} else {
  yield put(
    ForgotPasswordActions.verificationFailurePasswordReset(response.data),
  )
}
}



export function* passwordReset(api, { data }) {
   
const response = yield call(api.passwordReset, data)
// success?
if (response.ok) {
  yield call(api.setAuthToken, response.data)
  yield put(AccountActions.accountRequest())
  yield put(LoginActions.loginSuccess(response.data))
  yield put(ForgotPasswordActions.passwordResetSuccess(response.data))
} else {
  yield put(
    ForgotPasswordActions.passwordResetFailure(response.data),
  )
}
}