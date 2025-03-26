import { createSlice } from '@reduxjs/toolkit';
import { addChannel } from '../../asyncActions';

const defaultChannelId = '1';

const initialState = {
  modal: {
    isOpened: false,
    type: null,
    extra: null,
  },
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
    openModal(state, action) {
      const { type } = action.payload;
      state.modal.isOpened = true;
      state.modal.type = type;
    },
    closeModal(state) {
      state.modal.isOpened = false;
      state.modal.type = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChannel.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    });
  },
});

const { actions } = uiSlice;
export { actions as uiActions };

export default uiSlice.reducer;
