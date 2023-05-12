import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer({}, {
  // Contact reducers
  contactRequest: state => {
    state.loading = true;
  },
  contactSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  contactFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Request course reducers
  courseRequestRequest: state => {
    state.loading = true;
  },
  courseRequestSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  courseRequestFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Clear Errors reducers
  clearError: state => {
    state.error = null;
  },
  clearMessage: state => {
    state.message = null;
  },
});