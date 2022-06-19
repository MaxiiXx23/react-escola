import { createSlice } from '@reduxjs/toolkit';

export const buttonClicked = createSlice({
  name: 'button',
  initialState: {
    value: [],
    isLoading: false,
  },
  reducers: {
    incrementSuccess: (state, action) => {
      console.log('Success')
      state.value = action.payload;
      state.isLoading = false;
    },
    incrementRequest: (state, action) => {
      console.log('Its making request...');
      state.isLoading = true
    },
    incrementFailure: state => {
      console.log('Error on request');
      state.isLoading = false;
    }

  }
})
export const {incrementSuccess, incrementFailure, incrementRequest } = buttonClicked.actions;

export default buttonClicked.reducer;