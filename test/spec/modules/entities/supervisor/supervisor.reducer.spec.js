import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/supervisor/supervisor.reducer';

test('attempt retrieving a single supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.supervisor).toEqual({ id: undefined });
});

test('attempt retrieving a list of supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.supervisorList).toEqual([]);
});

test('attempt updating a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.supervisor).toEqual({ id: 1 });
});

test('success retrieving a list of supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.supervisorList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.supervisor).toEqual({ id: 1 });
});
test('success deleting a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.supervisor).toEqual({ id: undefined });
});

test('failure retrieving a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.supervisor).toEqual({ id: undefined });
});

test('failure retrieving a list of supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.supervisorList).toEqual([]);
});

test('failure updating a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.supervisor).toEqual(INITIAL_STATE.supervisor);
});
test('failure deleting a supervisor', () => {
  const state = reducer(INITIAL_STATE, Actions.supervisorDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.supervisor).toEqual(INITIAL_STATE.supervisor);
});

test('resetting state for supervisor', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.supervisorReset());
  expect(state).toEqual(INITIAL_STATE);
});
