import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateGradeLevel } from "./services/grade-level.service";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IGradeLevel from "./grade-level.interface";

const useModifyGradeLevel = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyLevelOfGradeLevel, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: IGradeLevel) =>
      updateGradeLevel(_level, _level.id),

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

  return { modifyLevelOfGradeLevel, isPending };
};
export default useModifyGradeLevel;
