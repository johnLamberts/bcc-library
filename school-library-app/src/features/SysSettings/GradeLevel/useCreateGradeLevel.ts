import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { addGradeLevel } from "./services/grade-level.service";

const useCreateGradeLevel = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGradeLevel, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: addGradeLevel,
    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Success! The ${data.gradeLevel} has been created successfully. `
      ),
        queryClient.invalidateQueries({
          queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL],
        });
      // queryClient.invalidateQueries({ queryKey: ["academic-course"] }),
    },
  });

  return { createGradeLevel, isPending };
};
export default useCreateGradeLevel;
