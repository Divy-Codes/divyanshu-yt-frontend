import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/api';

const initialState = {
  videos: [],
  error: null,
  loading: false,
  nextPageToken: null,
  query: '',
};

export const getSearchedVideos = createAsyncThunk(
  'searchedVideos/getSearchedVideos',
  async (query, { getState }) => {
    try {
      const { data } = await request('/search', {
        params: {
          part: 'snippet',
          maxResults: 25,
          q: query,
          type: 'video,channel',
          pageToken: getState().searchedVideos.nextPageToken,
        },
      });
      return {
        items: data.items,
        nextPageToken: data.nextPageToken,
        query: query,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

const searchedVideoSlice = createSlice({
  name: 'relatedVideos',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedVideos.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getSearchedVideos.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          query: action.payload.query,
          // videos: [...state.videos, ...action.payload.items],
          //Append the videos only if query is the same.
          videos:
            action.payload.query === state.query
              ? [...new Set([...state.videos, ...action.payload.items])]
              : action.payload.items,

          nextPageToken: action.payload.nextPageToken,
        };
      })
      .addCase(getSearchedVideos.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.error };
      });
  },
});

export default searchedVideoSlice.reducer;
