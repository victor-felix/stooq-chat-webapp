import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { RegisterForm, RegisterState } from './types';
import { registerSaga } from './sagas';
import { ApiResponseError } from 'types';

export const initialState: RegisterState = {
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    register(state, action: PayloadAction<RegisterForm>) {
      state.loading = true;
    },
    registerError(state, action: PayloadAction<ApiResponseError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: registerActions, reducer } = slice;

export const useRegisterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerSaga });
  return { actions: slice.actions };
};
