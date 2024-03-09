import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getActiveBooks } from "../service/catalogue.service";

const useReadActiveBooks = () => {
  return useQuery({
    queryFn: getActiveBooks,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ACTIVE_CATALOGUE],

    refetchOnWindowFocus: false,
  });
};

export default useReadActiveBooks;
