import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TGradeSection } from "./useReadGradeSection";

const useModifyGradeSection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyLevelOfGradeSection, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TGradeSection) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newLevels: TGradeSection) => {
      await queryClient.cancelQueries({ queryKey: ["grade-section"] });

      const prevLevel = queryClient.getQueryData([
        "grade-section",
      ]) as TGradeSection[];

      queryClient.setQueryData(
        ["grade-section"],
        (prevLevels: TGradeSection[]) =>
          //     [
          //       ...prevUsers,
          //       {
          //         ...newLevel,
          //         id: (Math.random() + 1).toString(36).substring(7),
          //       },
          //     ] as TLevelEducation[]

          prevLevels?.map((level: TGradeSection) =>
            level.id === newLevels.id ? newLevels : level
          )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(err.message);
      return queryClient.setQueryData(["grade-section"], context?.prevLevel);
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0].gradeLevel
        } Changes to ${data.gradeSection} have been applied.`
      );
    },
  });

  return { modifyLevelOfGradeSection, isPending };
};
export default useModifyGradeSection;
