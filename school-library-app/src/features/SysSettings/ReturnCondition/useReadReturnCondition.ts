import { useQuery } from "@tanstack/react-query";
import { getReturnConditions } from "./services/returned-condition.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useReadReturnCondition = () => {
  return useQuery({
    queryFn: getReturnConditions,

    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RETURNED_CONDITION],

    refetchOnWindowFocus: false,
  });
};
export default useReadReturnCondition;
