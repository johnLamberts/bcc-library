import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TGradeLevel } from "./useReadGradeLevel";

const useModifyGradeLevel = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyLevelOfGradeLevel, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TGradeLevel) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newLevels: TGradeLevel) => {
      await queryClient.cancelQueries({ queryKey: ["grade-level"] });

      const prevLevel = queryClient.getQueryData([
        "grade-level",
      ]) as TGradeLevel[];

      queryClient.setQueryData(["grade-level"], (prevLevels: TGradeLevel[]) =>
        //     [
        //       ...prevUsers,
        //       {
        //         ...newLevel,
        //         id: (Math.random() + 1).toString(36).substring(7),
        //       },
        //     ] as TLevelEducation[]

        prevLevels?.map((level: TGradeLevel) =>
          level.id === newLevels.id ? newLevels : level
        )
      );

      return { prevLevel };
    },

    onError: (err, _newLevel, context) => {
      toast.error(err.message);
      return queryClient.setQueryData(["grade-level"], context?.prevLevel);
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0].gradeLevel
        } Changes to ${data.gradeLevel} have been applied.`
      );
    },
  });

  return { modifyLevelOfGradeLevel, isPending };
};
export default useModifyGradeLevel;
