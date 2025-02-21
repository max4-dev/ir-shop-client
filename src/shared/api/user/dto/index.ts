import { ITokens } from "../types";

export interface ISignup {
  name: string;
  phone: string;
  password: string;
}

export type UserDTO = {
  id: string;
  name: string;
  phone: string;
} | null;

export interface IAuthResponse extends ITokens {
  user: UserDTO;
}
