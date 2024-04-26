//Related videos deprecated by youtube. So workaround is to search with keyword. Keyword would be current video's title

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/api';

const initialState = {
  videos: [],
  error: null,
  loading: false,
  // nextPageToken: null,
};

export const getRelatedVideos = createAsyncThunk(
  'relatedVideos/getRelatedVideos',
  async (videoTitle) => {
    try {
      const { data } = await request('/search', {
        params: {
          part: 'snippet',
          maxResults: 25,
          q: videoTitle,
          type: 'video',
          // pageToken: getState().homeVideos.nextPageToken,
        },
      });
      return {
        items: data.items,
        // nextPageToken: data.nextPageToken,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

const relatedVideosSlice = createSlice({
  name: 'relatedVideos',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedVideos.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getRelatedVideos.fulfilled, (state, action) => {
        return { ...state, loading: false, videos: action.payload.items };
      })
      .addCase(getRelatedVideos.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.error };
      });
  },
});

export default relatedVideosSlice.reducer;
