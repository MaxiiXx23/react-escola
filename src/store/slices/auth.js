import { createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { REHYDRATE } from 'redux-persist';
import axios from '../../services/axios';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: '',
    user: {},
    isLoading: false,
  },
  reducers: {

    loginSuccess: (state, action) => {
      const newState = {...state};
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    },
    loginRequest: (state, action) => {
      const newState = {...state};
      newState.isLoading = true
      return newState;
    },
    loginFailure: (state) => {
      const newState = { ...state };
      newState.isLoggedIn = false;
      newState.token = '';
      newState.isLoading = false;
      newState.user = {}
      delete axios.defaults.headers.authorization;
      return newState;
    },
    editRequest: (state, action) => {
      const newState = {...state};
      newState.isLoading = true
      return newState;
    },
    editSuccess: (state, action) => {
      const newState = {...state};
      newState.isLoading = false;
      return newState;
    },
    editFailure: (state, action) => {
      const newState = {...state};
      newState.isLoading = false;
      return newState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      const token = get(action, 'payload.auth.token', '');
      if(!token) return;
      axios.defaults.headers.authorization = `Bearer ${token}`;
    });
  }
})
export const {loginSuccess, loginFailure, loginRequest, editRequest, editSuccess, editFailure } = authSlice.actions;

export default authSlice.reducer;