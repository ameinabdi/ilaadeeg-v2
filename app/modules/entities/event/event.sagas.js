import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga';
import EventActions from './event.reducer'
import { v4 as uuidv4 } from 'uuid';

export function* getEvent(api, action) {
  const { eventId } = action
  // make the call to the api
  const apiCall = call(api.getEvent, eventId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventSuccess(response.data))
  } else {
    yield put(EventActions.eventFailure(response.data))
  }
}

export function* getEventSetup(api, action) {
  const { options } = action
  const response = yield call(api.getEventSetup);
  // success?
  if (response.ok) {
    yield put(EventActions.eventSetupSuccess(response.data))
  } else {
    yield put(EventActions.eventSetupFailure(response.data))
  }
}

export function* getEvents(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getEvents, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventAllSuccess(response.data.rows))
  } else {
    yield put(EventActions.eventAllFailure(response.data))
  }
}

export function* getPopularEvents(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getPopularEvents, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.popularEventSuccess(response.data))
  } else {
    yield put(EventActions.popularEventFailure(response.data))
  }
}

export function* updateEvent(api, action) {
  const { event } = action
  // make the call to the api
  const idIsNotNull = !!event.id
  const apiCall = call(idIsNotNull ? api.updateEvent : api.createEvent, event, event.tenentId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventUpdateSuccess(response.data))
  } else {
    yield put(EventActions.eventUpdateFailure(response.data))
  }
}

export function* uploadEventCover(api, action) {
  const { events, picture } = action
  // make the call to the api
  const data = new FormData();
  data.append('file', picture);
  // make the call to the api
  const Credentials = call(api.fetchFileCredentials, picture)
  const fetchFileCredentials = yield call(callApi, Credentials)
  const uploadImage = call(api.uploadImage, data,fetchFileCredentials.data.uploadCredentials.url)
  const responseImage = yield call(callApi, uploadImage)
  const id = uuidv4();
  const photos = [{
    id: id,
    name: picture.name,
    sizeInBytes: picture.size,
    publicUrl: fetchFileCredentials.data.publicUrl,
    privateUrl : fetchFileCredentials.data.privateUrl,
    downloadUrl:fetchFileCredentials.data.downloadUrl,
    new: true,
  }]
   events.thumbnail = photos
   const apiCall = call(api.addEventThumbnail,events)
  const response = yield call(callApi, apiCall)
  // success?
  if (response.ok) {
    yield put(EventActions.uploadEventCoverSuccess(response.data))
  } else {
    yield put(EventActions.uploadEventCoverFailure(response.data))
  }
}

export function* deleteEvent(api, action) {
  const { eventId } = action
  // make the call to the api
  const apiCall = call(api.deleteEvent, eventId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventDeleteSuccess())
  } else {
    yield put(EventActions.eventDeleteFailure(response.data))
  }
}
