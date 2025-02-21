import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useActions } from "@/src/shared/hooks";

import { useAuth } from "./useAuth";

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

  useEffect(() => {
    if (
      (user && isOnlyFor === UserTypes.IsOnlyGuest) ||
      (!user && isOnlyFor === UserTypes.IsOnlyUser)
    ) {
      router.replace("/");
    }
  }, [user, router, pathname, isOnlyFor, logout]);

  return null;
};
