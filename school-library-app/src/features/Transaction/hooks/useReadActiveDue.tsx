import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllActiveDue } from "../service/checkout.service";

const useReadActiveDue = () => {
  return useQuery({
    queryFn: getAllActiveDue,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.BORROW_TRANSACTION],

    refetchOnWindowFocus: false,
  });
};

export default useReadActiveDue;
