import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import { updateGradeLevel } from "./services/grade-level.service";
import IGradeLevel from "./grade-level.interface";

const useModifyGradeLevel = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGradeLevel, isPending } = useMutation({
    mutationFn: async (level: IGradeLevel) =>
      await updateGradeLevel(level, level.id),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! ${data.gradeLevel} Changes to ${data.gradeLevel} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL],
      });
    },
  });

  return { modifyGradeLevel, isPending };
};
export default useModifyGradeLevel;
