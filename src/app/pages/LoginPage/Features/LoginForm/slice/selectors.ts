import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) =>
  state?.authentication || initialState;

export const selectIsAuthenticated = createSelector(
  [selectDomain],
  authenticationState => authenticationState.isAuthenticated,
);

export const selectLoading = createSelector(
  [selectDomain],
  authenticationState => authenticationState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  authenticationState => authenticationState.error,
);

export const selectProfile = createSelector(
  [selectDomain],
  authenticationState => authenticationState.profile,
);

export const selectToken = createSelector(
  [selectDomain],
  authenticationState => authenticationState.token,
);
