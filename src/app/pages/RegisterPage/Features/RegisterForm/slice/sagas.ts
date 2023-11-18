import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios'; // eslint-disable-line
import { axiosInstance } from 'plugins/axios';
import { registerActions } from '.';
import { jwtDecode } from 'jwt-decode';
import { authenticationActions } from 'app/pages/LoginPage/Features/LoginForm/slice';
import {
  JwtPayloadResponsed,
  Profile,
} from 'app/pages/LoginPage/Features/LoginForm/slice/types';

export function* register({ payload }) {
  const { user_name, email, password } = payload;
  try {
    const response: AxiosResponse = yield call(axiosInstance.post, '/users', {
      user_name,
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
      yield put(registerActions.registerError(error.response.data));
      return;
    }
  }
}

export function* registerSaga() {
  yield takeLatest(registerActions.register, register);
}
