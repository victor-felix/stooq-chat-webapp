import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios'; // eslint-disable-line
import { roomsActions } from '.';
import { axiosInstance } from 'plugins/axios';

export function* loadRooms() {
  try {
    const response = yield call(axiosInstance.get, `/rooms`);
    yield put(roomsActions.roomsLoaded(response.data ? response.data : []));
  } catch (error: AxiosError | any) {
    if (error.response) {
      yield put(roomsActions.roomsError(error.response.data));
      return;
    }
  }
}

export function* createRoom({ payload }) {
  try {
    const response = yield call(axiosInstance.post, `/rooms`, {
      name: payload,
    });
    yield put(roomsActions.roomCreated(response.data));
  } catch (error: AxiosError | any) {
    if (error.response) {
      yield put(roomsActions.createRoomError(error.response.data));
      return;
    }
  }
}

export function* roomsSaga() {
  yield takeLatest(roomsActions.loadRooms, loadRooms);
  yield takeLatest(roomsActions.createRoom, createRoom);
}
