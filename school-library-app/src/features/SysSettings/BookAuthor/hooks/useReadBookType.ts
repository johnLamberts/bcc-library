import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllAuthor } from "../services/book-author.service";

const useReadAuthor = () => {
  return useQuery({
    queryFn: getAllAuthor,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.AUTHOR],

    refetchOnWindowFocus: false,
  });
};
export default useReadAuthor;
