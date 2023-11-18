import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state?.messages || initialState;

export const selectMessages = createSelector(
  [selectDomain],
  messagesState => messagesState.messages,
);

export const selectLoading = createSelector(
  [selectDomain],
  messagesState => messagesState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  messagesState => messagesState.error,
);

export const selectLoaded = createSelector(
  [selectDomain],
  messagesState => messagesState.loaded,
);

export const selectRoom = createSelector(
  [selectDomain],
  messagesState => messagesState.room,
);
