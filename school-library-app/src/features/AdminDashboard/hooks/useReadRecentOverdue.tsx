import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllRecentOverdue } from "../service/admin-dashboard.service";

const useReadRecentOverdue = () => {
  return useQuery({
    queryFn: getAllRecentOverdue,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE],

    refetchOnWindowFocus: false,
  });
};

export default useReadRecentOverdue;
