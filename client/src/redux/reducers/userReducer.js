import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer({}, {
  // Sign In reducers
  loginRequest: state => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = action.payload.message;
  },
  loginFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload.error;
  },
  // Sign Up reducers
  registerRequest: state => {
    state.loading = true;
  },
  registerSucess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = action.payload.message;
  },
  registerFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload.error;
  },
  // Logout reducers
  logoutRequest: state => {
    state.loading = true;
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.message = action.payload.message;
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.error = action.payload.error;
  },
  // Loadi user reducers
  loadUserRequest: state => {
    state.loading = true;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = state.user === null ? false : true;
    state.user = action.payload;
  },
  loadUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
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

export const profileReducer = createReducer({}, {
  // Update Profile reducers
  updateProfilePictureRequest: state => {
    state.laoding = false;
  },
  updateProfileSuccess: (state, action) => {
    state.laoding = false;
    state.message = action.payload;
  },
  updateProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Update Profile Picture Reducers
  updateProfilePictureRequest: state => {
    state.loading = true;
  },
  updateProfilePictureSuccess: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateProfilePictureFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Change Password reducers
  changePasswordRequest: state => {
    state.loading = true;
  },
  changePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  changePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Forgot Password reducers
  forgetPasswordRequest: state => {
    state.loading = true;
  },
  forgetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgetPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Reset Password reducers
  resetPasswordRequest: state => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Remove from Playlist reducers
  removeFromPlaylistRequest: state => {
    state.loading = true;
  },
  removeFromPlaylistSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  removeFromPlaylistFail: (state, action) => {
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

export const subscriptionReducer = createReducer({}, {
  // Buy Subscription reducers
  buySubscriptionRequest: state => {
    state.loading = true;
  },
  buySubscriptionSuccess: (state, action) => {
    state.loading = false;
    state.subscriptionId = action.payload;
  },
  buySubscriptionFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Cancel subscription reducers
  cancelSubscriptionRequest: state => {
    state.loading = true;
  },
  cancelSubscriptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  cancelSubscriptionFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Clear Error reducers
  clearError: state => {
    state.error = null;
  },
  clearMessage: state => {
    state.message = null;
  },
});