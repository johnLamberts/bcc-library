import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addAcademicCourse } from "./academic-course.service";

const useCreateAcademicCourse = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createAcademicCourse, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: addAcademicCourse,
    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.academicCourse} has been created successfully. `
      ),
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.ACADEMIC_COURSE],
        });
      // queryClient.invalidateQueries({ queryKey: ["academic-course"] }),
    },
  });

  return { createAcademicCourse, isPending };
};
export default useCreateAcademicCourse;
