import request from '../../utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

export const getChannelVideos = createAsyncThunk(
  'channelVideos/getChannelVideos',
  async (id) => {
    try {
      //STEP 1 : Get Uploaded Videos Playlist Id
      const { data } = await request('/channels', {
        params: {
          part: 'contentDetails',
          id: id,
        },
      });
      const uploadedPlaylistId =
        data.items[0].contentDetails.relatedPlaylists.uploads;

      //STEP 2: Get upload playlist Items
      const response = await request('/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          playlistId: uploadedPlaylistId,
          maxResults: 50,
        },
      });
      return {
        items: response.data.items,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

const channelVideosSlice = createSlice({
  name: 'channelVideosSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChannelVideos.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        return { ...state, videos: action.payload.items, loading: false };
      })
      .addCase(getChannelVideos.rejected, (state, action) => {
        return { ...state, error: action.payload.error, loading: false };
      });
  },
});

export default channelVideosSlice.reducer;
