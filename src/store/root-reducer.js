import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice.js';
import logoutSlice from './slices/logout.slice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  logout: logoutSlice,
});

export default rootReducer;
