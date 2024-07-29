import { createSlice } from '@reduxjs/toolkit';

const signupInitialState = {
  signup: {
    isPending: false,
    error: '',
  },
};

const signupSlice = createSlice({
  name: 'signup',
  initialState: signupInitialState,
  reducers: {
    signupRequestAction: () => ({
      isPending: true,
      error: '',
    }),
    signupSuccessAction: () => ({
      isPending: false,
      error: '',
    }),
    signupFailureAction: (state, { payload }) => ({
      isPending: false,
      error: payload,
    }),
  },
});

export const { signupRequestAction, signupSuccessAction, signupFailureAction } =
  signupSlice.actions;

export default signupSlice.reducer;
