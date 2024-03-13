import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooks } from "../service/admin-dashboard.service";

function useCountBooks() {
  return useQuery({
    queryFn: getBooks,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_BOOKS],

    refetchOnWindowFocus: false,
  });
}

export default useCountBooks;
