import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = '1';

const initialState = {
  currentChannelId: defaultChannelId,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
  },
});

const { actions } = uiSlice;
export { actions as uiActions };

export default uiSlice.reducer;
