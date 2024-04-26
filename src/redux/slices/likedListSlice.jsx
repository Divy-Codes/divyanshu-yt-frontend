import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/api';

const initialState = {
  videos: [],
  error: null,
  loading: false,
};

export const getLikedVideos = createAsyncThunk(
  'likedVideosList/getLikedVideosList',
  async (args, { getState }) => {
    try {
      const { data } = await request('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          maxResults: 50,
          myRating: 'like',
        },
        headers: {
          Authorization: `Bearer ${getState().authObject.accessToken}`,
        },
      });
      console.log(`liked videos list:`, data.items);
      return {
        items: data.items,
      };
    } catch (error) {
      console.log(`error:`, error.response.data);
      return { error: error.response.data };
    }
  }
);

const likedListSlice = createSlice({
  name: 'likedListSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLikedVideos.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          videos: action.payload.items,
        };
      })
      .addCase(getLikedVideos.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.error };
      });
  },
});

export default likedListSlice.reducer;
