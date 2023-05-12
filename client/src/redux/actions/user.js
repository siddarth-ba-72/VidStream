import { USERS_URL_API, PAYMENTS_URL_API } from '../store';
import axios from 'axios';

export const signIn = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${USERS_URL_API}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: 'loginSuccess',
      payload: data,
    });
    // localStorage.setItem('vidstreamUserInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error.response.data.message,
    });
  };
};

export const signUp = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });
    const { data } = await axios.post(
      `${USERS_URL_API}/register`,
      formdata, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }
    );
    dispatch({
      type: 'registerSuccess',
      payload: data,
    });
    // localStorage.setItem('vidstreamUserInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: 'registerFail',
      payload: error.response.data.message,
    });
  };
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(
      `${USERS_URL_API}/me`, { withCredentials: true }
    );
    // const data = JSON.parse(localStorage.getItem('vidstreamUserInfo'));
    dispatch({
      type: 'loadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'loadUserFail',
      payload: error.response.data.message
    });
  };
};

export const logout = () => async dispatch => {
  try {
    dispatch({
      type: 'logoutRequest'
    });
    const { data } = await axios.get(`${USERS_URL_API}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
    localStorage.removeItem('vidstreamUserInfo');
  } catch (error) {
    dispatch({
      type: 'logoutFail',
      payload: error.response.data.message
    });
  };
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });
    const { data } = await axios.get(`${PAYMENTS_URL_API}/subscribe`, {
      withCredentials: true,
    });
    dispatch({
      type: 'buySubscriptionSuccess',
      payload: data.subscriptionId
    });
    const { userData } = await axios.get(`${USERS_URL_API}/me`, { withCredentials: true });
    localStorage.setItem('vidstreamUserInfo', JSON.stringify(userData.user));
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  };
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });
    const { data } = await axios.delete(`${PAYMENTS_URL_API}/subscribe/cancel`, {
      withCredentials: true,
    });
    dispatch({
      type: 'cancelSubscriptionSuccess',
      payload: data.message
    });
    const { userData } = await axios.get(`${USERS_URL_API}/me`, { withCredentials: true });
    localStorage.setItem('vidstreamUserInfo', JSON.stringify(userData.user));
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  };
};
