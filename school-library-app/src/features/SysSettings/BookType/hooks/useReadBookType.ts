import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllBookType } from "../services/book-type.service";

const useReadBookType = () => {
  return useQuery({
    queryFn: getAllBookType,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOK_TYPE],

    refetchOnWindowFocus: false,
  });
};
export default useReadBookType;
