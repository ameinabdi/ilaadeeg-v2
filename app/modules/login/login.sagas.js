import { call, put, select } from 'redux-saga/effects';

import AppConfig from '../../config/app-config';
import LoginActions from './login.reducer';
import AccountActions from '../../shared/reducers/account.reducer';
import AuthInfoActions from '../../shared/reducers/auth-info.reducer';
import { doOauthPkceFlow, logoutFromIdp } from './login.utils';

export const selectAuthInfo = (state) => state.authInfo.authInfo;
export const selectIdToken = (state) => state.login.idToken;
export const selectAuthToken = (state) => state.login.authToken;

// attempts to login
export function* login(api, action) {
  const { telephone } = action;
  // make the call to the api
  const response = yield call(api.registerTelephone, telephone);
  // success?
  if (response.ok) {
    const token =response.data;
    yield call(api.setAuthToken, token)
    yield put(LoginActions.loginSuccess(token))
    yield put(AccountActions.accountRequest())
  } else {
    yield call(api.removeAuthToken);
    yield put(LoginActions.loginFailure(response.data));
  }
}


export function* signupSocail(api, action) {
  const { user } = action;
  // make the call to the api
  console.log('rr', user)

  const response = yield call(api.signupSocail, user);
  console.log('2222', response)

  // success?
  if (response.ok) {
    const token =response.data;
    yield call(api.setAuthToken, token)
    yield put(LoginActions.signupSocailSuccess(token))
    yield put(AccountActions.accountRequest())
  } else {
    yield call(api.removeAuthToken);
    yield put(LoginActions.signupSocailFailure(response.data));
  }
}


// attempts to login
export function* verification(api, action) {
  const { customer } = action;
  // make the call to the api
  const response = yield call(api.verifyTelephone, customer);
  // success?
  if (response.ok) {
    yield put(AccountActions.accountRequest())
    yield put(LoginActions.verificationSuccess(response.data))
  } else {
    yield put(LoginActions.verificationFailure(response.data));
  }
}

export function* updateTelephone(api, action) {
  const { customer } = action;
  // make the call to the api
  const response = yield call(api.updateTelephone, customer);
  // success?
  if (response.ok) {
    yield put(AccountActions.accountRequest())
    yield put(LoginActions.updateTelephoneSuccess(response.data))
  } else {
    yield put(LoginActions.updateTelephoneFailure(response.data));
  }
}

export function* ResendCode(api, { phoneNumber }) {

  const response = yield call(api.ResendCode, {telephone:phoneNumber})
  // success?
  if (response.ok) {
    yield put(LoginActions.resendCodeSuccess(response.data))

  } else {
    yield put(
      LoginActions.resendCodeFailure(
        (response.data && response.data) || 'Registration failed',
      ),
    )
  }
}

// attempts to login
export function* registerCustomer(api, action) {
  const { customer } = action;
  // make the call to the api
  const response = yield call(api.register, customer);
  // success?
  if (response.ok ) {
    yield put(AccountActions.accountRequest())
    yield put(LoginActions.registerSuccess(response.data))
  } else {
    yield put(LoginActions.registerFailure(response.data));
  }
}


// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthToken);
  yield put(AccountActions.accountReset());
  yield put(AccountActions.accountRequest());
  yield put(LoginActions.logoutSuccess());
  yield put({ type: 'RELOGIN_ABORT' });
}

// loads the login
export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken);
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  yield put(LoginActions.loginLoadSuccess());
}
