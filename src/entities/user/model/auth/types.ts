import { UserDTO } from "@/src/shared/api/user";

export interface IAuthInitialState {
  user: UserDTO;
  isLoading: boolean;
}