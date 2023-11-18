import { RootState } from './RootState';

export type { RootState };

export interface ApiResponseError {
  type: string;
  status: number;
  code: string;
  title: string;
  detail: string;
}
