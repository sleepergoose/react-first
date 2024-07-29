import { put, takeLatest } from 'redux-saga/effects';
import { signupFailureAction, signupRequestAction, signupSuccessAction } from '../slices/signup.slice';
import authService from '../../services/auth.service';
import { loginSuccessAction } from '../slices/auth.slice';

function* signupWorker({ payload }) {
  try {
    const response = yield authService.signUp({
      email: payload.email,
      name: payload.name,
      password: payload.password,
    });

    yield put(signupSuccessAction(response));
    yield put(loginSuccessAction(response));

  } catch (error) {
    yield put(signupFailureAction(error?.message));
  }
}

export function* signupWatcher() {
  yield takeLatest(signupRequestAction, signupWorker);
}