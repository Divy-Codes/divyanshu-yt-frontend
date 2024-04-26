import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/api';

const initialState = {
  loading: false,
  video: null,
  error: null,
};

export const getVideoById = createAsyncThunk(
  'videoInfo/getVideoById',
  async (id) => {
    try {
      const response = await request('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: id,
        },
      });
      return {
        video: {
          snippet: response.data.items[0].snippet,
          contentDetails: response.data.items[0].contentDetails,
          statistics: response.data.items[0].statistics,
        },
      };
    } catch (error) {
      return { error: error.message };
    }
  }
);

const videoByIdSlice = createSlice({
  name: 'videoInfo',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVideoById.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        return { ...state, loading: false, video: action.payload.video };
      })
      .addCase(getVideoById.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.error };
      });
  },
});

export default videoByIdSlice.reducer;

/**
 *data.items[0]
 .contentDetails.duration
 .snippet.publishedAt .channelTitle .description
 .snippet.localized

 */
