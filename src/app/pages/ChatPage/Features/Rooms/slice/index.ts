import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Room, RoomsState } from './types';
import { ApiResponseError } from 'types';
import { roomsSaga } from './sagas';

export const initialState: RoomsState = {
  rooms: [],
  loading: false,
  loaded: false,
  error: null,
};

const slice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    loadRooms(state) {
      state.loading = true;
    },
    roomsLoaded(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
      state.loading = false;
      state.loaded = true;
    },
    roomsError(state, action: PayloadAction<ApiResponseError>) {
      state.error = action.payload;
      state.loading = false;
    },
    createRoom(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    roomCreated(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
      state.loading = false;
      state.loaded = true;
    },
    createRoomError(state, action: PayloadAction<ApiResponseError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: roomsActions, reducer } = slice;

export const useRoomsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: roomsSaga });
  return { actions: slice.actions };
};
