import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllGradeSection } from "./grade-section.service";

const useReadGradeSection = () => {
  return useQuery({
    queryFn: getAllGradeSection,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION],

    refetchOnWindowFocus: false,
  });
};
export default useReadGradeSection;
