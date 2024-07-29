import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  isLoading: false,
  isLoggedIn: false,
  error: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginRequestAction: () => ({
      isLoading: true,
      isLoggedIn: false,
      error: '',
      user: null,
    }),
    loginSuccessAction: (state, { payload }) => ({
      isLoading: false,
      isLoggedIn: payload?.success,
      error: '',
      user: payload?.user,
    }),
    loginFailureAction: (state, { payload }) => ({
      isLoading: false,
      isLoggedIn: false,
      error: payload,
      user: null,
    }),
    clearAuthAction: () => ({
      isLoading: false,
      isLoggedIn: false,
      error: '',
      user: null,
    }),
  },
});

export const {
  loginRequestAction,
  loginSuccessAction,
  loginFailureAction,
  clearAuthAction,
} = authSlice.actions;

export default authSlice.reducer;
