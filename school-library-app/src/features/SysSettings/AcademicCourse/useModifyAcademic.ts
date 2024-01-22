import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TLevel } from "./useReadAcademic";

const useModifyAcademicCourse = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: modifyLevelOfAcademicCourse, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TLevel) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newLevels: TLevel) => {
      await queryClient.cancelQueries({ queryKey: ["academic-course"] });

      const prevLevel = queryClient.getQueryData([
        "academic-course",
      ]) as TLevel[];

      queryClient.setQueryData(["academic-course"], (prevLevels: TLevel[]) =>
        //     [
        //       ...prevUsers,
        //       {
        //         ...newLevel,
        //         id: (Math.random() + 1).toString(36).substring(7),
        //       },
        //     ] as TLevelEducation[]

        prevLevels?.map((level: TLevel) =>
          level.id === newLevels.id ? newLevels : level
        )
      );

      return { prevLevel };
    },

    onError: (err, newLevel, context) => {
      alert(JSON.stringify(newLevel, null, 4));
      toast.error(err.message);
      return queryClient.setQueryData(["academic-course"], context?.prevLevel);
    },

    onSuccess: (_newArr, data, context) => {
      toast.success(
        `Update successful! ${
          context.prevLevel.filter((prev) => prev.id === data.id)[0]
            .academicCourse
        } Changes to ${data.academicCourse} have been applied.`
      );
    },
  });

  return { modifyLevelOfAcademicCourse, isPending };
};
export default useModifyAcademicCourse;
