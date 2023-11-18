import { ApiResponseError } from 'types';

export interface RegisterState {
  loading: boolean;
  error: ApiResponseError | null;
}

export interface RegisterForm {
  user_name: string;
  email: string;
  password: string;
}
