import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooksReturned } from "../service/circulation.service";

const useReadBooksReturned = () => {
  return useQuery({
    queryFn: getBooksReturned,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION],

    refetchOnWindowFocus: false,
  });
};

export default useReadBooksReturned;
