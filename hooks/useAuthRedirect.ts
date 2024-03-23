import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "./useAuth";

type isOnlyFor = 'isOnlyUser' | 'isOnlyGuest'

export const useAuthRedirect = (isOnlyFor: isOnlyFor) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (isOnlyFor === 'isOnlyGuest') {
      if (user) {
        router.replace('/');
      }
    } else if (!user && pathname !== '/login' || pathname !== '/signup') {
        router.replace('/login');
      }
  }, [user, router, pathname]);

  return null;
};