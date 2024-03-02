import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { bookConditionReport } from "../services/book-condition.service";

const useReadBookConditionnReport = () => {
  return useQuery({
    queryFn: bookConditionReport,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BOOKS_RETURN_CONDITION],

    refetchOnWindowFocus: false,
  });
};

export default useReadBookConditionnReport;
