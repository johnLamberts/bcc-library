import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getTodayTransaction } from "../service/admin-dashboard.service";

function useTodayTransaction() {
  return useQuery({
    queryFn: getTodayTransaction,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_TODAY_TRANSACTION],

    refetchOnWindowFocus: false,
  });
}

export default useTodayTransaction;
