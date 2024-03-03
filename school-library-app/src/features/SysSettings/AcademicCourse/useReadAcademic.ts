import { useQuery } from "@tanstack/react-query";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { getAllAcademicCourse } from "./academic-course.service";

const useReadAcademicCourse = () => {
  return useQuery({
    queryFn: getAllAcademicCourse,
    queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE],

    refetchOnWindowFocus: false,
  });
};
export default useReadAcademicCourse;
