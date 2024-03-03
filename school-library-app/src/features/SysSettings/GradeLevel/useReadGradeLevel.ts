import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllGradeLevel } from "./services/grade-level.service";

const useReadGradeLevel = () => {
  return useQuery({
    queryFn: getAllGradeLevel,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL],

    refetchOnWindowFocus: false,
  });
};
export default useReadGradeLevel;
