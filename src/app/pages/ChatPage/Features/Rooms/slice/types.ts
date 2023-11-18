import { ApiResponseError } from 'types';

export interface RoomsState {
  rooms: Room[];
  loading: boolean;
  loaded: boolean;
  error: ApiResponseError | null;
}

export interface Room {
  id: string;
  name: string;
  created_at: Date;
}
