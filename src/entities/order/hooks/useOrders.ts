import { useQuery } from "@tanstack/react-query";

import { orderRequest } from "../handler";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: orderRequest.getByUser,
  });
