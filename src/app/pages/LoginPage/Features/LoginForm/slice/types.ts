import { ApiResponseError } from 'types';

export interface AuthenticationState {
  isAuthenticated: boolean;
  loading: boolean;
  email: string;
  password: string;
  token: string;
  error: ApiResponseError | null;
  profile: Profile | null;
}

export interface Profile {
  id: string;
  userName: string;
  email: string;
}

export interface AuthenticationForm {
  email: string;
  password: string;
}

export interface JwtPayloadResponsed {
  id: string;
  user_name: string;
  email: string;
}
