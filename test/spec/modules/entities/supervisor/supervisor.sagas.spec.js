import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import SupervisorSagas from '../../../../../app/modules/entities/supervisor/supervisor.sagas';
import SupervisorActions from '../../../../../app/modules/entities/supervisor/supervisor.reducer';

const { getSupervisor, getAllSupervisors, updateSupervisor, deleteSupervisor } = SupervisorSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getSupervisor(1);
  const step = stepper(getSupervisor(FixtureAPI, { supervisorId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(SupervisorActions.supervisorSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getSupervisor(FixtureAPI, { supervisorId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(SupervisorActions.supervisorFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllSupervisors();
  const step = stepper(getAllSupervisors(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(SupervisorActions.supervisorAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllSupervisors(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(SupervisorActions.supervisorAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateSupervisor({ id: 1 });
  const step = stepper(updateSupervisor(FixtureAPI, { supervisor: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(SupervisorActions.supervisorUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateSupervisor(FixtureAPI, { supervisor: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(SupervisorActions.supervisorUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteSupervisor({ id: 1 });
  const step = stepper(deleteSupervisor(FixtureAPI, { supervisorId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(SupervisorActions.supervisorDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteSupervisor(FixtureAPI, { supervisorId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(SupervisorActions.supervisorDeleteFailure()));
});
