import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state?.rooms || initialState;

export const selectRooms = createSelector(
  [selectDomain],
  roomsState => roomsState.rooms,
);

export const selectLoading = createSelector(
  [selectDomain],
  roomsState => roomsState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  roomsState => roomsState.error,
);

export const selectLoaded = createSelector(
  [selectDomain],
  roomsState => roomsState.loaded,
);
