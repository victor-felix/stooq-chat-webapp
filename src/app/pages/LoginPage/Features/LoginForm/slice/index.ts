import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { AuthenticationForm, AuthenticationState, Profile } from './types';
import { authenticationSaga } from './sagas';
import { ApiResponseError } from 'types';

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  loading: false,
  email: '',
  password: '',
  error: null,
  token: '',
  profile: null,
};

const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<AuthenticationForm>) {
      state.loading = true;
    },
    authenticationError(state, action: PayloadAction<ApiResponseError>) {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
      state.email = '';
      state.password = '';
    },
    authenticationSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.email = '';
      state.password = '';
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.token = '';
      state.profile = null;
    },
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
  },
});

export const { actions: authenticationActions, reducer } = slice;

export const useAuthenticationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authenticationSaga });
  return { actions: slice.actions };
};
