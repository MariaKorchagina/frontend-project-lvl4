/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const defaultChannelId = 1;

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
  isFetching: false,
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: ((state, action) => {
      const { id } = action.payload;
      channelsAdapter.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    }),
    changeChannelName: channelsAdapter.updateOne,
    setCurrentChannelId: ((state, action) => {
      state.currentChannelId = action.payload;
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannelId = currentChannelId;
        state.isFetching = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export { fetchData };
