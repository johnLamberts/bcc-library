import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooksTransaction } from "../service/circulation.service";

const useReadTransactionList = () => {
  return useQuery({
    queryFn: getBooksTransaction,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION],

    refetchOnWindowFocus: false,
  });
};

export default useReadTransactionList;
