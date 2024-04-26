import request from '../../utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  videos: [],
  error: null,
};

export const getSubscriptions = createAsyncThunk(
  'subscriptions/getSubscriptions',
  async (args, { getState }) => {
    try {
      const { data } = await request('/subscriptions', {
        params: {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 50,
        },
        headers: {
          Authorization: `Bearer ${getState().authObject.accessToken}`,
        },
      });
      return {
        videos: data.items,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

const subscriptionsSlice = createSlice({
  name: 'getSubscriptions/subscriptionSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          videos: action.payload.videos,
        };
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        return { ...state, loading: false };
      });
  },
});

export default subscriptionsSlice.reducer;
