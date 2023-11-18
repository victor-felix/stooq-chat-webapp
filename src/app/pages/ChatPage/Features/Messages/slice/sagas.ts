import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios'; // eslint-disable-line
import { messagesActions } from '.';
import { axiosInstance } from 'plugins/axios';

export function* loadMessages({ payload }) {
  try {
    const response: AxiosResponse = yield call(
      axiosInstance.get,
      `/rooms/${payload.id}/messages`,
    );

    yield put(
      messagesActions.messagesLoaded(response.data ? response.data : []),
    );
  } catch (error: AxiosError | any) {
    if (error.response) {
      yield put(messagesActions.messagesError(error.response.data));
      return;
    }
  }
}

export function* messagesSaga() {
  yield takeLatest(messagesActions.loadMessages, loadMessages);
}
