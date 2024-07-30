import { call, put, takeLatest } from 'redux-saga/effects';
import {
  logoutRequestAction,
  logoutSuccessAction,
  logoutFailureAction,
} from '../slices/logout.slice.js';
import { clearAuthState } from '../../utils/local-storage.utils.js';
import authService from '../../services/auth.service.js';
import { clearAuthAction } from '../slices/auth.slice.js';

function* logoutWorker() {
  try {
    yield call(authService.logOut);
    yield put(logoutSuccessAction());
    yield put(clearAuthAction());
    yield call(clearAuthState);
  } catch (error) {
    yield put(logoutFailureAction(error?.message));
  }
}

export function* logoutWatcher() {
  yield takeLatest(logoutRequestAction, logoutWorker);
}
