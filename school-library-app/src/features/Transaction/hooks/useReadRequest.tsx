import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooksRequested } from "../service/circulation.service";

const useReadRequest = () => {
  return useQuery({
    queryFn: getBooksRequested,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.REQUEST_BOOK],

    refetchOnWindowFocus: false,
  });
};

export default useReadRequest;
