import { TOKEN_TYPE } from './auth.enums';

export type AuthToken = string;

export interface JwtPayload {
  id: string;
  tokenType: TOKEN_TYPE;
  expiration: Date;
}

export interface IAuthResponse<T> {
  token: AuthToken;
  user: T;
}

export interface LocaleSignInDto {
  email: string;
  password: string;
}
