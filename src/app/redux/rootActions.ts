import * as guestUserActions from "@/src/entities/guest-user/model/guest-user/asyncActions";
import * as userActions from "@/src/entities/user/model/auth/asyncActions";
import * as profileActions from "@/src/entities/user/model/profile/asyncActions";

export const rootActions = {
  ...profileActions,
  ...userActions,
  ...guestUserActions,
};
