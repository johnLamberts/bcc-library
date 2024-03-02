import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getReturnsTransaction } from "../service/circulation.service";

const useReadReturnList = () => {
  return useQuery({
    queryFn: getReturnsTransaction,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_TRANSACTION],
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export default useReadReturnList;
