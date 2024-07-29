import { createSlice } from '@reduxjs/toolkit';

const initialLogoutState = {
  logout: {
    isPending: false,
    error: '',
  }
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState: initialLogoutState,
  reducers: {
    logoutRequestAction: (state) => {
      state.logout.isPending = true;
      state.logout.error = '';
    },
    logoutSuccessAction: (state) => {
      state.logout.isPending = false;
      state.logout.error = '';
    },
    logoutFailureAction: (state, { payload }) => {
      state.logout.isPending = false;
      state.logout.error = payload?.message;
    },
  }
});

export const {
  logoutRequestAction,
  logoutSuccessAction,
  logoutFailureAction,
} = logoutSlice.actions;

export default logoutSlice.reducer;