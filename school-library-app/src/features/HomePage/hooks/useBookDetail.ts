import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBook } from "../services/books.service";

const useBookDetail = () => {
  const { bookId } = useParams();

  const {
    isLoading,
    data: book,
    error,
    refetch,
  } = useQuery({
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_CATALOGUE, bookId],
    queryFn: () => getBook(bookId),
  });

  return {
    isLoading,
    book,
    error,
    refetch,
  };
};
export default useBookDetail;
