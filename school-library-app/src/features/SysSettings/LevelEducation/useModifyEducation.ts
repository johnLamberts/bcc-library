import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateLevelOfducation } from "./level-of-education.service";
import ILevelOfEducation from "./level-of-education.interface";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";

const useModifyEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyLevelOfEducation, isPending } = useMutation({
    mutationFn: async (level: ILevelOfEducation) =>
      await updateLevelOfducation(level, level.id),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! ${data.levelOfEducation} Changes to ${data.levelOfEducation} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_LEVEL],
      });
    },
  });

  return { modifyLevelOfEducation, isPending };
};
export default useModifyEducation;
