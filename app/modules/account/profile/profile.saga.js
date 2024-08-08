import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import { v4 as uuidv4 } from 'uuid';

import ProfileActions from './Profile.reducer'
import AccountActions from '../../../shared/reducers/account.reducer'
import LoginActions from '../../login/login.reducer';


export function* updateProfile(api, { user}) {
    // make the call to the api
    
    const apiCall = call(api.updateProfile,user)
    const response = yield call(callApi, apiCall)
      // success?
      if (response.ok) {
        yield put(AccountActions.accountRequest())

        yield put(ProfileActions.profileUpdateSuccess(response.data))
        yield put(ProfileActions.profileDoneRequest())
      } else {
        yield put(ProfileActions.profileUpdateFailure(response.data))
        
      }
}
    


export function* deleteProfile(api, { id}) {
    // make the call to the api
    
    const apiCall = call(api.deleteUser,id)
    const response = yield call(callApi, apiCall)
      // success?
      if (response.ok) {
        yield call(api.removeAuthToken);
        yield put(AccountActions.accountReset());
        yield put(AccountActions.accountRequest())
        yield put(LoginActions.logoutSuccess());
        yield put(ProfileActions.profileDeleteSuccess(response.data))
        yield put(ProfileActions.profileDoneRequest())
      } else {
        yield put(ProfileActions.profileDeleteFailure(response.data))
        
      }
}