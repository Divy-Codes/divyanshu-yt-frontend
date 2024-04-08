import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import homeVideosSlice from './slices/homeVideosSlice';
import videoByIdSlice from './slices/videoByIdSlice';
import channelByIdSlice from './slices/channelById';
import commentsByIdSlice from './slices/commentsByIdSlice';
import relatedVideosSlice from './slices/relatedVideosSlice';
import searchVideoSlice from './slices/searchVideoSlice';
import subscriptionsSlice from './slices/subscriptionsSlice';
import channelVideosSlice from './slices/channelVideosSlice';
import likeDislikeSlice from './slices/likeVideoSlice';

export const store = configureStore({
  reducer: {
    authObject: authReducer,
    homeVideos: homeVideosSlice,
    selectedVideoDetails: videoByIdSlice,
    selectedChannelDetails: channelByIdSlice,
    commentThreads: commentsByIdSlice,
    relatedVideos: relatedVideosSlice,
    searchedVideos: searchVideoSlice,
    subscriptions: subscriptionsSlice,
    channelVideos: channelVideosSlice,
    likeDislikeStatus: likeDislikeSlice,
  },
});
