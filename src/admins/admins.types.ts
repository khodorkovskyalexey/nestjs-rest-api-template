import { IAuthResponse } from 'src/auth/auth.types';
import { Admin } from './entities';

export enum AdminRole {
  ADMIN = 'admin',
}

export type AuthAdmin = IAuthResponse<Admin>;
