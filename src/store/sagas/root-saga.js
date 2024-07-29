import { all, fork } from 'redux-saga/effects';
import { loginWatcher } from './login.saga';

export default function* rootSaga() {
  yield all([fork(loginWatcher)]);
}
