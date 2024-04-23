import { IUser } from "../auth/types";

export interface IUserInitialState {
  profile: IUser | null;
  isLoading: boolean;
}
