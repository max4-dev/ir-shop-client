export enum Tokens {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type IUser = {
  id: string;
  name: string;
  phone: string;
  password: string;
} | null

export interface IAuthResponse extends ITokens {
  user: IUser
}

export interface IInitialState {
  user: IUser,
  isLoading: boolean,
}