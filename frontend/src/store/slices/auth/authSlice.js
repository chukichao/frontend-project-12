import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
  },
});

const { actions } = authSlice;
export { actions as authActions };

export default authSlice.reducer;
