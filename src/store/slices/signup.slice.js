import { createSlice } from '@reduxjs/toolkit';

const signupInitialState = {
  signup: {
    isPending: false,
    error: '',
  }
};

const signupSlice = createSlice({
  name: 'signup',
  initialState: signupInitialState,
  reducers: {
    signupRequestAction: (state) => {
      state.signup.isPending = true;
      state.signup.error = '';
    },
    signupSuccessAction: (state) => {
      state.signup.isPending = false;
      state.signup.error = '';
    },
    signupFailureAction: (state, { payload }) => {
      state.signup.isPending = false;
      state.signup.error = payload;
    },
  }
});

export const {
  signupRequestAction,
  signupSuccessAction,
  signupFailureAction,
} = signupSlice.actions;

export default signupSlice.reducer;