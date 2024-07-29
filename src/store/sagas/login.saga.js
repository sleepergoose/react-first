import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailureAction,
} from '../slices/auth.slice.js';
import authService from '../../services/auth.service.js';

function* loginWorker({ payload }) {
  try {
    const response = yield call(authService.signIn, {
      email: payload.email,
      password: payload.password,
    });

    yield put(loginUserSuccessAction(response));
  } catch (error) {
    yield put(loginUserFailureAction(error?.message));
  }
}

export function* loginWatcher() {
  yield takeLatest(loginUserAction, loginWorker);
}
