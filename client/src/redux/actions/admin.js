import { USERS_URL_API, COURSES_URL_API, MISC_URL_API } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(
      `${COURSES_URL_API}/createcourse`,
      formData,
      config
    );
    dispatch({
      type: 'createCourseSuccess',
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  };
};

export const deleteCourse = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(`${COURSES_URL_API}/course/${id}`, config);
    dispatch({
      type: 'deleteCourseSuccess',
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  };
};

export const addLecture = (id, formdata) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addLectureRequest' });
    const { data } = await axios.post(
      `${COURSES_URL_API}/course/${id}`,
      formdata,
      config
    );
    dispatch({
      type: 'addLectureSuccess',
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response.data.message,
    });
  };
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });
    const { data } = await axios.delete(
      `${COURSES_URL_API}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      config
    );
    dispatch({
      type: 'deleteLectureSuccess',
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  };
};

export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });
    const { data } = await axios.get(`${USERS_URL_API}/admin/allusers`, config);
    dispatch({
      type: 'getAllUsersSuccess',
      payload: data.users
    });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  };
};

export const updateUserRole = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(`${USERS_URL_API}/admin/user/${id}`, {}, config);
    dispatch({
      type: 'updateUserRoleSuccess',
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(`${USERS_URL_API}/admin/user/${id}`, config);
    dispatch({
      type: 'deleteUserSuccess',
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  };
};

export const getDashboardStats = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });
    const { data } = await axios.get(`${MISC_URL_API}/admin/stats`, config);
    dispatch({
      type: 'getAdminStatsSuccess',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  };
};

export const trackAllQueries = () => async dispatch => {
  try {
    const config = {
      withCredentials: true
    };
    dispatch({ type: 'allQueriesRequest' });
    const { data } = await axios.get(`${MISC_URL_API}/allcontact`, config);
    dispatch({
      type: 'allQueriesSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'allQueriesFail',
      payload: error.response.data.message,
    });
  };
};

export const trackAllCourseRequests = () => async dispatch => {
  try {
    const config = {
      withCredentials: true
    };
    dispatch({ type: 'courseReqRequest' });
    const { data } = await axios.get(`${MISC_URL_API}/allcourserequest`, config);
    dispatch({
      type: 'courseReqSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'courseReqFail',
      payload: error.response.data.message,
    });
  };
};

