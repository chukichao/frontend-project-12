import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
