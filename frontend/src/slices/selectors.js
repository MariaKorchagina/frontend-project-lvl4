// import { selectors as channelsSelectors } from './channels';
// import { selectors as messagesSelectors } from './messages';

// export const getAllChannels = (state) => channelsSelectors.selectAll(state);
// export const getCurrentChannelId = (state) => state.channels.channelId;
// export const getCurrentChannel = (state) => {
//   const channelId = getCurrentChannelId(state);
//   return channelsSelectors.selectById(state, channelId);
// };
// export const isDataFetching = (state) => state.channels.isFetching;
// export const getAllMessages = (state) => messagesSelectors.selectAll(state);
// export const getModalType = (state) => state.modals.modalType;
// export const getItemId = (state) => state.modals.itemId;


/* eslint-disable import/prefer-default-export */

import { selectors as channelsSelectors } from './channelsSlice.js';
import { selectors as messagesSelectors } from './messagesSlice.js';

export const getAllChannels = (state) => channelsSelectors.selectAll(state);

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getCurrentChannel = (state) => {
  const currentChannelId = getCurrentChannelId(state);
  return channelsSelectors.selectById(state, currentChannelId);
};

export const isDataFetching = (state) => state.channels.isFetching;

export const getAllMessages = (state) => messagesSelectors.selectAll(state);

export const getModalType = (state) => state.modals.modalType;

export const getItemId = (state) => state.modals.itemId;