import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice.js';
import logoutSlice from './slices/logout.slice.js';
import signupSlice from './slices/signup.slice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  logout: logoutSlice,
  signup: signupSlice,
});

export default rootReducer;
