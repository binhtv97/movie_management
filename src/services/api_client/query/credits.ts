import { useQuery } from "@tanstack/react-query";
import { CreditKey } from "../queries_key/credits";
import { getCredit } from "../interfaces/credits/credits_service";

export const useGetCredits = (id: number) => {
  return useQuery({
    queryKey: [CreditKey.get],
    queryFn: () => getCredit(id),
  });
};
