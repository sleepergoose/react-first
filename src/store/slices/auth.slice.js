import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  auth: {
    isLoading: false,
    isLoggedIn: false,
    error: '',
    user: null,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginUserAction: (state) => {
      state.auth.isLoading = true;
      state.auth.isLoggedIn = false;
      state.auth.error = '';
      state.auth.user = null;
    },
    loginUserSuccessAction: (state, { payload }) => {
      state.auth.isLoading = false;
      state.auth.isLoggedIn = payload?.success;
      state.auth.error = '';
      state.auth.user = payload?.user;
    },
    loginUserFailureAction: (state, { error }) => {
      state.auth.isLoading = false;
      state.auth.isLoggedIn = false;
      state.auth.error = error;
      state.auth.user = null;
    }
  }
});

export const {
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailureAction,
} = authSlice.actions;

export default authSlice.reducer;