import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllCategorySection } from "../services/category-section.service";

const useReadCategorySection = () => {
  return useQuery({
    queryFn: getAllCategorySection,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],

    refetchOnWindowFocus: false,
  });
};
export default useReadCategorySection;
