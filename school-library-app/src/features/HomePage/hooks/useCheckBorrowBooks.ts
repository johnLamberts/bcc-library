import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { checkTransactionBorrow } from "../services/books.service";

const useCheckBorrowBooks = () => {
  const { bookId } = useParams();

  const {
    isLoading,
    data: book,
    error,
  } = useQuery({
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TRANSACTION_IF_EXIST],
    queryFn: () => checkTransactionBorrow(bookId as string),
  });

  return {
    isLoading,
    book,
    error,
  };
};
export default useCheckBorrowBooks;
