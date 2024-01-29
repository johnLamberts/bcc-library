import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllOverdues } from "../service/overdue.service";

const useReadOverdue = () => {
  return useQuery({
    queryFn: getAllOverdues,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_OVERDUE],

    refetchOnWindowFocus: false,
  });
};

export default useReadOverdue;
