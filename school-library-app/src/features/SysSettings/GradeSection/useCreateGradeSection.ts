import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TGradeSection } from "../GradeSection/useReadGradeSection";

const useCreateGradeSection = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGradeSection, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (_level: TGradeSection) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return Promise.resolve();
    },
    onMutate: async (newAcademic: TGradeSection) => {
      await queryClient.cancelQueries({ queryKey: ["grade-section"] });

      const prevAcademics = queryClient.getQueryData(["grade-section"]);

      queryClient.setQueryData(
        ["grade-section"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevAcademic: any) =>
          [
            ...prevAcademic,
            {
              ...newAcademic,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as TGradeSection[]
      );

      return { prevAcademics };
    },

    onError: (err, _newLevel, context) => {
      toast.error(err.message);
      return queryClient.setQueryData(
        ["grade-section"],
        context?.prevAcademics
      );
    },

    onSuccess: (_newArr, data) =>
      toast.success(
        `Success! The ${data.gradeSection} has been created successfully. `
      ),
    // queryClient.invalidateQueries({ queryKey: ["academic-course"] }),
  });

  return { createGradeSection, isPending };
};
export default useCreateGradeSection;
