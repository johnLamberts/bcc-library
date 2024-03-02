import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllCompletePaymentReport } from "../services/fee.service";

const useReadFeeReport = () => {
  return useQuery({
    queryFn: getAllCompletePaymentReport,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.COMPLETE_PAYMENT],

    refetchOnWindowFocus: false,
  });
};

export default useReadFeeReport;
