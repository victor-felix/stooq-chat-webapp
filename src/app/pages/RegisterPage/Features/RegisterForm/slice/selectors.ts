import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state?.messages || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  registerState => registerState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  registerState => registerState.error,
);
