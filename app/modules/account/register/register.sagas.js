import { call, put } from 'redux-saga/effects'

import RegisterActions from './register.reducer'
import LoginActions from './../../login/login.reducer'
import AccountActions from '../../../shared/reducers/account.reducer'

// attempts to register
export function* register(api, { user }) {
  const response = yield call(api.register, user)
  console.log('444444',response)

  // success?
  if (response.ok) {
    yield put(RegisterActions.registerSuccess(response.data))
  } else {
    yield put(RegisterActions.registerFailure(response.data))
  }
}


export function* verification(api, { token }) {
    const object = {
      code:token
    }
  const response = yield call(api.verification, object)
  // success?
  if (response.ok) {
    yield call(api.setAuthToken, response.data)
    yield put(AccountActions.accountRequest())
    yield put(LoginActions.loginSuccess(response.data))
    yield put(RegisterActions.verificationSuccess(response.data))
  } else {
    yield put(
      RegisterActions.verificationFailure(response.data),
    )
  }
}



export function* ResendCode(api, { phoneNumber }) {

  const response = yield call(api.ResendCode, {phoneNumber})
  // success?
  if (response.ok) {
    yield put(RegisterActions.resendCodeSuccess(response.data))

  } else {
    yield put(
      RegisterActions.resendCodeFailure(
        (response.data && response.data) || 'Registration failed',
      ),
    )
  }
}