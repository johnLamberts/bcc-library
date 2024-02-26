import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooksReserved } from "../service/circulation.service";

const useReadReserved = () => {
  return useQuery({
    queryFn: getBooksReserved,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.RESERVED_BOOK],

    refetchOnWindowFocus: false,
  });
};

export default useReadReserved;
