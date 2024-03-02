import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooksReportTransaction } from "../services/transaction.service";

const useReadTransactionReport = () => {
  return useQuery({
    queryFn: getBooksReportTransaction,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ALL_BOOKS_TRANSACTION],

    refetchOnWindowFocus: false,
  });
};

export default useReadTransactionReport;
