import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/api';

const initialState = {
  channel: null,
  error: null,
  loading: false,
  subscriptionStatus: false,
};

export const getChannelById = createAsyncThunk(
  'channelInfo/getChannelById',
  async (id) => {
    try {
      const { data } = await request('/channels', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id,
        },
      });
      return {
        channel: data.items[0],
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

export const getSubscriptionStatus = createAsyncThunk(
  'channelInfo/getSubscriptionStatus',
  async (id, { getState }) => {
    try {
      const { data } = await request('/subscriptions', {
        params: {
          part: 'snippet',
          forChannelId: id,
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${getState().authObject.accessToken}`,
        },
      });
      return {
        subscriptionStatus: data.items.length !== 0,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

const channelByIdSlice = createSlice({
  name: 'channelInfo',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChannelById.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getChannelById.fulfilled, (state, action) => {
        return { ...state, loading: false, channel: action.payload.channel };
      })
      .addCase(getChannelById.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.error };
      })
      .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
        return {
          ...state,
          subscriptionStatus: action.payload.subscriptionStatus,
        };
      });
  },
});

export default channelByIdSlice.reducer;
