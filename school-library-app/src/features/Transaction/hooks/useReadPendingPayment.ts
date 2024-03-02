import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getPartialPayment } from "../service/circulation.service";

const useReadPartialPayment = () => {
  return useQuery({
    queryFn: getPartialPayment,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.PARTIAL_PAYMENT],

    refetchOnWindowFocus: false,
  });
};

export default useReadPartialPayment;
