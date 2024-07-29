import { all, fork } from 'redux-saga/effects';
import { loginWatcher } from './login.saga';
import { logoutWatcher } from './logout.saga.js';

export default function* rootSaga() {
  yield all([
    fork(loginWatcher),
    fork(logoutWatcher),
  ]);
}
