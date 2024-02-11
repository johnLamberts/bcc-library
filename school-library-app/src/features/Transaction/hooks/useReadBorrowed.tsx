import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getBooksBorrowed } from "../service/circulation.service";

const useReadBooksBorrowed = () => {
  return useQuery({
    queryFn: getBooksBorrowed,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION],

    refetchOnWindowFocus: false,
  });
};

export default useReadBooksBorrowed;
