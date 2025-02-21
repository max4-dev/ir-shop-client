import { UserDTO } from "@/src/shared/api/user";

export interface UserDTOInitialState {
  profile: UserDTO | null;
  isLoading: boolean;
}
