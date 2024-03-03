import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IAcademicCourse from "./academic-course.interface";
import { updateAcademicCourse } from "./academic-course.service";

const useModifyAcademicCourse = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyAcademicCourse, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (academic: IAcademicCourse) =>
      updateAcademicCourse(academic, academic.id),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! ${data.academicCourse} Changes to ${data.academicCourse} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE],
      });
    },
  });

  return { modifyAcademicCourse, isPending };
};
export default useModifyAcademicCourse;
