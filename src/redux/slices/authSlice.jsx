import { createSlice } from '@reduxjs/toolkit';

//Authentication would NOT be an asynchronous task. Hence no need for thunk or extraReducers

const initialState = {
  accessToken: JSON.parse(sessionStorage.getItem('access-token')) || null,
  user: JSON.parse(sessionStorage.getItem('user-profile')) || null,
  loading: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    authPending: (state) => {
      return { ...state, loading: true };
    },
    authSuccess: (state, action) => {
      return { ...state, accessToken: action.payload, loading: false };
    },
    authRejected: (state, action) => {
      return {
        ...state,
        loading: false,
        accessToken: null,
        error: action.payload,
      };
    },
    loadProfile: (state, action) => {
      return { ...state, user: action.payload };
    },
    logout: (state) => {
      return {
        ...state,
        accessToken: null,
        user: null,
        loading: false,
      };
    },
  },
});

export const { authPending, authRejected, authSuccess, loadProfile, logout } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
