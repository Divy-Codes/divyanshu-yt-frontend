import request from '../../utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//POST Request with no request body. Hence empty object
//No response. If response.status==204 then API request success.

export const likeDislikeVideo = createAsyncThunk(
  'likeVideo/likeVideoById',
  async (args, { getState }) => {
    try {
      const { videoId, likeStatus } = args;
      const response = await request.post(
        '/videos/rate',
        {},
        {
          params: {
            id: videoId,
            rating: likeStatus,
          },
          headers: {
            Authorization: `Bearer ${getState().authObject.accessToken}`,
          },
        }
      );
      console.log(response);
      return {
        status: response.status,
      };
    } catch (error) {
      return {
        status: error.status,
      };
    }
  }
);

const likeDislikeSlice = createSlice({
  name: 'like/Dislike',
  initialState: {
    status: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeDislikeVideo.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(likeDislikeVideo.fulfilled, (state, action) => {
        return { ...state, loading: false, status: action.payload.status };
      })
      .addCase(likeDislikeVideo.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload.status };
      });
  },
});
export default likeDislikeSlice.reducer;
