import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer({
  courses: [],
  lectures: []
}, {
  // All courses reducers
  allCoursesRequest: state => {
    state.loading = true;
  },
  allCoursesSuccess: (state, action) => {
    state.loading = false;
    state.courses = action.payload;
  },
  allCoursesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Course Details reducers
  getCourseRequest: state => {
    state.loading = true;
  },
  getCourseSuccess: (state, action) => {
    state.loading = false;
    state.lectures = action.payload;
  },
  getCourseFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // Add to Playlist reducers
  addToPlaylistRequest: state => {
    state.loading = true;
  },
  addToPlaylistSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addToPlaylistFail: (state, action) => {
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