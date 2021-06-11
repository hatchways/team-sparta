import { User } from './User';
import { Contest } from './Contest';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
  contests?: [Contest];
}
