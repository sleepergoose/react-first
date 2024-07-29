import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice.js';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
