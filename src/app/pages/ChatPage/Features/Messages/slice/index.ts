import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Message, MessagesState } from './types';
import { ApiResponseError } from 'types';
import { messagesSaga } from './sagas';
import { Room } from '../../Rooms/slice/types';

export const initialState: MessagesState = {
  messages: [],
  room: null,
  loading: false,
  loaded: false,
  error: null,
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    loadMessages(state, action: PayloadAction<Room>) {
      state.room = action.payload;
      state.loading = true;
    },
    messagesLoaded(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
      state.loading = false;
      state.loaded = true;
    },
    messagesError(state, action: PayloadAction<ApiResponseError>) {
      state.error = action.payload;
      state.loading = false;
    },
    pushMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { actions: messagesActions, reducer } = slice;

export const useMessagesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: messagesSaga });
  return { actions: slice.actions };
};
