import { IUser } from "../auth/types";

export interface IUserInitialState {
  profile: IUser | null;
  isLoading: boolean;
}

export interface IValidateResponse {
  status: boolean;
}

export interface IUserUpdate {
  phone: string;
  password?: string;
  name?: string;
}
