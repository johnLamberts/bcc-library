import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FIRESTORE_COLLECTION_QUERY_KEY } from "src/shared/enums";
import IGradeSection from "./grade-section.interface";
import { updateGradeSection } from "./grade-section.service";

const useModifyGradeSection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyGradeSection, isPending } = useMutation({
    mutationFn: async (level: IGradeSection) =>
      await updateGradeSection(level, level.id),

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (_newArr, data) => {
      toast.success(
        `Update successful! ${data.gradeSection} Changes to ${data.gradeSection} have been applied.`
      );

      queryClient.invalidateQueries({
        queryKey: [FIRESTORE_COLLECTION_QUERY_KEY.GRADE_SECTION],
      });
    },
  });

  return { modifyGradeSection, isPending };
};
export default useModifyGradeSection;
