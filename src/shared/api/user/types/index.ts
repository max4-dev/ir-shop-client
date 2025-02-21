export enum Tokens {
  ACCESS = "accessToken",
  REFRESH = "refreshToken",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface WithPayload<T> {
  payload: T;
}

export enum AuthType {
  LOGIN = "login",
  REGISTER = "register",
}


