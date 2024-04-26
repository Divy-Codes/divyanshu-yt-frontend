import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/api';

export const getVideosByCategory = createAsyncThunk(
  'videosByCategory/getVideosByCategory',
  async (keyword, { getState }) => {
    try {
      const { data } = await request.get('/search', {
        params: {
          part: 'snippet',
          maxResults: 20,
          q: keyword,
          pageToken: getState().homeVideos.nextPageToken,
          type: 'video',
        },
      });

      return {
        items: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
);

export const getHomeVideos = createAsyncThunk(
  'homeVideos/getHomeVideos',
  async (args, { getState }) => {
    try {
      const { data } = await request.get('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          regionCode: 'IN',
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
        },
      });
      return {
        items: data.items,
        nextPageToken: data.nextPageToken,
        category: 'All',
      };
    } catch (error) {
      return { error: error.message };
    }
  }
);

const homeVideosSlice = createSlice({
  name: 'homeVideos',
  initialState: {
    videos: [],
    nextPageToken: null,
    loading: false,
    activeCategory: 'All',
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomeVideos.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getHomeVideos.fulfilled, (state, action) => {
        return {
          ...state,
          //Concat videos if active category is same. Implies another call made by infinite-scroll
          videos:
            state.nextPageToken !== action.payload.nextPageToken &&
            state.activeCategory === action.payload.category
              ? [...state.videos, ...action.payload.items]
              : action.payload.items,
          nextPageToken: action.payload.nextPageToken,
          activeCategory: action.payload.category,
          loading: false,
        };
      })
      .addCase(getHomeVideos.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      })
      .addCase(getVideosByCategory.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getVideosByCategory.fulfilled, (state, action) => {
        return {
          ...state,
          videos:
            state.nextPageToken !== action.payload.nextPageToken &&
            state.activeCategory === action.payload.category
              ? [...state.videos, ...action.payload.items]
              : action.payload.items,
          loading: false,
          nextPageToken: action.payload.nextPageToken,
          activeCategory: action.payload.category,
        };
      })
      .addCase(getVideosByCategory.rejected, (state, action) => {
        return { ...state, error: action.payload.error, loading: false };
      });
  },
});

export default homeVideosSlice.reducer;
