import { createSlice } from '@reduxjs/toolkit';

const initialLogoutState = {
  logout: {
    isPending: false,
    error: '',
  },
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState: initialLogoutState,
  reducers: {
    logoutRequestAction: () => ({
      isPending: true,
      error: '',
    }),
    logoutSuccessAction: () => ({
      isPending: false,
      error: '',
    }),
    logoutFailureAction: (state, { payload }) => ({
      isPending: false,
      error: payload,
    }),
  },
});

export const { logoutRequestAction, logoutSuccessAction, logoutFailureAction } =
  logoutSlice.actions;

export default logoutSlice.reducer;
