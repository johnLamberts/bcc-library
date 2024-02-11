import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllMissingCategory } from "./services/missing-category.service";

const useReadMissingCategory = () => {
  return useQuery({
    queryFn: getAllMissingCategory,

    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.MISSING_CATEGORY],

    refetchOnWindowFocus: false,
  });
};
export default useReadMissingCategory;
