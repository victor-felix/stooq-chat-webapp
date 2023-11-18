import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios'; // eslint-disable-line
import { axiosInstance } from 'plugins/axios';
import { authenticationActions } from '.';
import { jwtDecode } from 'jwt-decode';
import { JwtPayloadResponsed, Profile } from './types';

export function* authenticate({ payload }) {
  const { email, password } = payload;
  try {
    const response: AxiosResponse = yield call(axiosInstance.post, '/auth', {
      email,
      password,
    });

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    const decodedToken = jwtDecode(response.data.token) as JwtPayloadResponsed;
    const profile: Profile = {
      id: decodedToken.id,
      userName: decodedToken.user_name,
      email: decodedToken.email,
    };

    yield put(authenticationActions.authenticationSuccess(response.data.token));
    yield put(authenticationActions.setProfile(profile));
  } catch (error: AxiosError | any) {
    if (error.response) {
      yield put(authenticationActions.authenticationError(error.response.data));
      return;
    }
  }
}

export function* authenticationSaga() {
  yield takeLatest(authenticationActions.authenticate, authenticate);
}
