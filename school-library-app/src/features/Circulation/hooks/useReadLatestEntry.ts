import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getLatestStudent } from "../service/student.service";

const useReadStudentEntry = () => {
  return useQuery({
    queryFn: getLatestStudent,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT_ENTRY],

    refetchOnWindowFocus: false,
  });
};
export default useReadStudentEntry;
