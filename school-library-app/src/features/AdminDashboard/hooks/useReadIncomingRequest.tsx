import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllIncomingRequest } from "../service/admin-dashboard.service";

const useReadIncomingRequest = () => {
  return useQuery({
    queryFn: getAllIncomingRequest,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ADMIN_INCOMING_REQUEST],

    refetchOnWindowFocus: false,
  });
};

export default useReadIncomingRequest;
