import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllDamagedCategory } from "./services/damaged-category.service";

const useReadDamagedCategory = () => {
  return useQuery({
    queryFn: getAllDamagedCategory,

    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.DAMAGE_CATEGORY],

    refetchOnWindowFocus: false,
  });
};
export default useReadDamagedCategory;
