import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getStudents } from "../service/student.service";

const useReadStudents = () => {
  return useQuery({
    queryFn: getStudents,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.STUDENT],

    refetchOnWindowFocus: false,
  });
};

export default useReadStudents;
