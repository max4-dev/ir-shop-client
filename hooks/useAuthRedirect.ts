import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "./useAuth";

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && (pathname !== '/login' ?? pathname !== '/signup')) {
      router.replace('/login');
    }
  }, [user, router]);

  return null;
};