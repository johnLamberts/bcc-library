import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import {
  getAllCategorySection,
  getArchiveCategorySection,
} from "../services/category-section.service";

const useReadCategorySection = () => {
  return useQuery({
    queryFn: getAllCategorySection,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.CATEGORY_SECTION],

    refetchOnWindowFocus: false,
  });
};

const useReadArchiveCategorySection = () => {
  return useQuery({
    queryFn: getArchiveCategorySection,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ARCHIVE_CATEGORY_SECTION],

    refetchOnWindowFocus: false,
  });
};
export { useReadCategorySection, useReadArchiveCategorySection };
