import { TLevelEducation } from "@pages/SystemSettings/LevelEducation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TGradeLevel } from "./useReadGradeLevel";

const useCreateGradeLevel = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGradeLevel, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TGradeLevel) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newAcademic: TGradeLevel) => {
      await queryClient.cancelQueries({ queryKey: ["grade-level"] });

      const prevAcademics = queryClient.getQueryData(["grade-level"]);

      queryClient.setQueryData(
        ["grade-level"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevAcademic: any) =>
          [
            ...prevAcademic,
            {
              ...newAcademic,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as TLevelEducation[]
      );

      return { prevAcademics };
    },

    onError: (err, _newLevel, context) => {
      toast.error(err.message);
      return queryClient.setQueryData(["grade-level"], context?.prevAcademics);
    },

    onSuccess: (_newArr, data) =>
      toast.success(
        `Success! The ${data.gradeLevel} has been created successfully. `
      ),
    // queryClient.invalidateQueries({ queryKey: ["academic-course"] }),
  });

  return { createGradeLevel, isPending };
};
export default useCreateGradeLevel;
