import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  userReducer,
  subscriptionReducer
} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

// const userInfoFromStorage = localStorage.getItem("vidstreamUserInfo")
//   ? JSON.parse(localStorage.getItem("vidstreamUserInfo"))
//   : null;

// const initialState = {
//   user: {
//     isAuthenticated: userInfoFromStorage === null ? false : true,
//     user: userInfoFromStorage
//   }
// }

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
  // preloadedState: initialState
});

export const USERS_URL_API = 'http://localhost:4000/api/vs/users';
export const PAYMENTS_URL_API = 'http://localhost:4000/api/vs/payments';
export const COURSES_URL_API = 'http://localhost:4000/api/vs/courses';
export const MISC_URL_API = 'http://localhost:4000/api/vs/others';