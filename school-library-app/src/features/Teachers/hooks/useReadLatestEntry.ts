import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getLatestTeacher } from "../services/teacher.service";

const useReadTeacherEntry = () => {
  return useQuery({
    queryFn: getLatestTeacher,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TEACHER_ENTRY],

    refetchOnWindowFocus: false,
  });
};
export default useReadTeacherEntry;
