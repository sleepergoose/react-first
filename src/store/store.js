import { configureStore } from '@reduxjs/toolkit';
import configs from '../configuration/config.js';
import rootReducer from './root-reducer.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root-saga.js';
import { getAuthState, saveAuthState } from '../utils/local-storage.utils.js';

const preloadedState = getAuthState();

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  preloadedState: preloadedState,
  devTools: !configs.isProduction,
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveAuthState({
    auth: store.getState().auth,
  });
});

export default store;
