import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { getStoreLocal } from "@/helpers/getStoreLocal";

import { useAuth } from "./useAuth";
import { useActions } from "./useActions";

export enum UserTypes {
  IsOnlyUser = "isOnlyUser",
  IsOnlyGuest = "isOnlyGuest",
}

type isOnlyFor = UserTypes.IsOnlyUser | UserTypes.IsOnlyGuest;

export const useAuthRedirect = (isOnlyFor: isOnlyFor) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useActions();
  const { user } = useAuth();
  const userLocal = getStoreLocal("user");

  useEffect(() => {
    if (isOnlyFor === UserTypes.IsOnlyGuest) {
      if (userLocal) {
        router.replace("/");
      }
    } else if (!userLocal && (pathname !== "/login" ?? pathname !== "/signup")) {
      logout();
      router.replace("/login");
    }
  }, [user, getStoreLocal("user"), router, pathname]);

  return null;
};
