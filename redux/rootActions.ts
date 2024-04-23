import * as userActions from "./auth/asyncActions";
import * as profileActions from "./profile/asyncActions";

export const rootActions = {
  ...profileActions,
  ...userActions,
};
