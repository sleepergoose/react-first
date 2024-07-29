import { configureStore } from '@reduxjs/toolkit';
import configs from '../configuration/config.js';
import rootReducer from './root-reducer.js';

const preloadedState = {};

const store = configureStore({
  preloadedState: preloadedState,
  devTools: !configs.isProduction,
  reducer: rootReducer,
});

export default store;