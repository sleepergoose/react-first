import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  auth: {
    isLoading: false,
    isLoggedIn: false,
    error: '',
    user: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginRequestAction: (state) => {
      state.auth.isLoading = true;
      state.auth.isLoggedIn = false;
      state.auth.error = '';
      state.auth.user = null;
    },
    loginSuccessAction: (state, { payload }) => {
      state.auth.isLoading = false;
      state.auth.isLoggedIn = payload?.success;
      state.auth.error = '';
      state.auth.user = payload?.user;
    },
    loginFailureAction: (state, { error }) => {
      state.auth.isLoading = false;
      state.auth.isLoggedIn = false;
      state.auth.error = error;
      state.auth.user = null;
    },
    clearAuthAction: (state) => {
      state.auth = authInitialState.auth;
    },
  },
});

export const {
  loginRequestAction,
  loginSuccessAction,
  loginFailureAction,
  clearAuthAction,
} = authSlice.actions;

export default authSlice.reducer;
