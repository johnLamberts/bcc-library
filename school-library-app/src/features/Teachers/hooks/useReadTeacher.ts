import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getTeachers } from "../services/teacher.service";

const useReadTeachers = () => {
  return useQuery({
    queryFn: getTeachers,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.TEACHER],

    refetchOnWindowFocus: false,
  });
};

export default useReadTeachers;
