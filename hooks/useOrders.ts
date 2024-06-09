import { useQuery } from "@tanstack/react-query";

import { orderRequest } from "@/components/entities/order/handler";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: orderRequest.getByUser,
  });
