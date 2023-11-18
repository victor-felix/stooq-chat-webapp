import { ApiResponseError } from 'types';
import { Room } from '../../Rooms/slice/types';

export interface MessagesState {
  messages: Message[];
  room: Room | null;
  loading: boolean;
  loaded: boolean;
  error: ApiResponseError | null;
}

export interface Message {
  id?: string;
  room_id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export interface CreateMessagePayload {
  room_id: string;
  content: string;
}
