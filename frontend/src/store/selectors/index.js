// auth
export const getToken = (state) => state.auth.token;
export const getUsername = (state) => state.auth.username;

// ui
export const getCurrentChannelId = (state) => state.ui.currentChannelId;
export const getModal = (state) => state.ui.modal;
export const getExtra = (state) => state.ui.modal.extra;

// channels
export const getChannels = (state) => state.channels.entities;

// messages
export const getMessages = (state) => state.messages.entities;
