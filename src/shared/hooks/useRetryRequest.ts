import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";

import { HttpCodes } from "../const";
import { UserDTO } from "../api/user";

interface UseRetryRequestProps {
  requestFn: () => void;
  user: UserDTO;
}

export const useRetryRequest = ({ requestFn, user }: UseRetryRequestProps) => {
  const [retry, setRetry] = useState(false);

  const executeRequest = useCallback(async () => {
    if (!user || !user.id) {
      return;
    }

    try {
      await requestFn();
    } catch (error) {
      console.log("Error executing request:", error);
      if (error instanceof AxiosError && error.response?.status === HttpCodes.Unauthorized) {
        setRetry(true);
      }
    }
  }, [user, requestFn]);

  useEffect(() => {
    executeRequest();
  }, [executeRequest, retry]);

  return { retry, setRetry };
};
