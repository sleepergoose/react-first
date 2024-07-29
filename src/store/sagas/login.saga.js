import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequestAction,
  loginSuccessAction,
  loginFailureAction,
} from '../slices/auth.slice.js';
import authService from '../../services/auth.service.js';

function* loginWorker({ payload }) {
  try {
    const response = yield call(authService.signIn, {
      email: payload.email,
      password: payload.password,
    });

    yield put(loginSuccessAction(response));
  } catch (error) {
    yield put(loginFailureAction(error?.message));
  }
}

export function* loginWatcher() {
  yield takeLatest(loginRequestAction, loginWorker);
}
